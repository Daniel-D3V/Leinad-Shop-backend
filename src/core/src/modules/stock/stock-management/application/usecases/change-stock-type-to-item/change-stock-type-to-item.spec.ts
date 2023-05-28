import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeStockTypeToAutoUsecase } from "./change-stock-type-to-item.usecase"
import { StockTypeChangedToItemEvent } from "./stock-type-changed-to-item.event"
import { StockManagementRepositoryInterface } from "../../../domain/repositories"
import { StockManagementEntity } from "../../../domain/entities"
import { ChangeStockTypeToAutoUsecaseInterface } from "../../../domain/usecases"

jest.mock("./stock-type-changed-to-item.event")

describe("Test ChangeProductStockTypeToAutoUsecaseInterface", () => {


    let sut: ChangeStockTypeToAutoUsecaseInterface
    let props: ChangeStockTypeToAutoUsecaseInterface.InputDto
    let stockManagementRepository: StockManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockManagementEntity: StockManagementEntity

    beforeEach(() => {

        props = {
            stockAutoId: "any_product_stock_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        stockManagementEntity = mock<StockManagementEntity>({
            id: props.stockAutoId,
            isStockAuto: () => false,
        })
        stockManagementRepository = mock<StockManagementRepositoryInterface>({
            findById: () => stockManagementEntity
        } as any)

        sut = new ChangeStockTypeToAutoUsecase(stockManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return ProductStockNotFoundError if product stock does not exists", async () => {
        jest.spyOn(stockManagementRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockNotFoundError")
    })

    it("Should return ProductStockAlreadyIsItemError if stock is already auto", async () => {
        jest.spyOn(stockManagementEntity, "isStockItem").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockAlreadyIsItemError")
    })

    it("Should call toStockItem from stockManagementEntity", async () => {
        await sut.execute(props)
        expect(stockManagementEntity.toStockItem).toBeCalledTimes(1)
    })

    it("Should call productStockRepository.update once", async () => {
        await sut.execute(props)
        expect(stockManagementRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create StockTypeChangedToItemEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockTypeChangedToItemEvent).toBeCalledWith({
            id: props.stockAutoId
        })
    })

})