import { EventEmitterInterface } from "@/modules/@shared/events"
import { ChangeStockTypeToNormalUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases"
import { mock } from "jest-mock-extended"
import { ChangeStockTypeToNormalUsecase } from "./change-product-stock-type-to-normal.usecase"
import { StockTypeChangedToNormalEvent } from "./stock-type-changed-to-normal.event"
import { StockManagementEntity } from "../../../domain/entities"
import { StockManagementRepositoryInterface } from "../../../domain/repositories"


jest.mock("./stock-type-changed-to-normal.event")

describe("Test ChangeStockTypeToNormalUsecase", () => {


    let sut: ChangeStockTypeToNormalUsecase
    let props: ChangeStockTypeToNormalUsecaseInterface.InputDto
    let stockManagementRepository: StockManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockManagementEntity: StockManagementEntity

    beforeEach(() => {

        props = {
            stockManagementId: "any_product_stock_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        stockManagementEntity = mock<StockManagementEntity>({
            id: props.stockManagementId,
            isStockAuto: () => false,
        })
        stockManagementRepository = mock<StockManagementRepositoryInterface>({
            findById: () => stockManagementEntity
        } as any)

        sut = new ChangeStockTypeToNormalUsecase(stockManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockManagementNotFoundError if stock does not exists", async () => {
        jest.spyOn(stockManagementRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManagementNotFoundError")
    })

    it("Should return StockManagementAlreadyIsManualError if product stock is already auto", async () => {
        jest.spyOn(stockManagementEntity, "isStockNormal").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManagementAlreadyIsManualError")
    })

    it("Should call toStockAuto from productStockEntity", async () => {
        await sut.execute(props)
        expect(stockManagementEntity.toStockNormal).toBeCalledTimes(1)
    })

    it("Should call stockManagementRepository.update once", async () => {
        await sut.execute(props)
        expect(stockManagementRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create stockTypeChangedToNormalEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockTypeChangedToNormalEvent).toBeCalledWith({
            id: props.stockManagementId
        })
    })

})