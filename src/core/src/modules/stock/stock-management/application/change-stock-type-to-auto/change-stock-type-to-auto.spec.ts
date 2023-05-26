import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeStockTypeToAutoUsecase } from "./change-stock-type-to-auto.usecase"
import { StockTypeChangedToAutoEvent } from "./stock-type-changed-to-auto.event"
import { StockManagementRepositoryInterface } from "../../domain/repositories"
import { StockManagementEntity } from "../../domain/entities"
import { ChangeStockTypeToAutoUsecaseInterface } from "../../domain/usecases"

jest.mock("./stock-type-changed-to-auto.event")

describe("Test ChangeProductStockTypeToAutoUsecaseInterface", () => {


    let sut: ChangeStockTypeToAutoUsecaseInterface
    let props: ChangeStockTypeToAutoUsecaseInterface.InputDto
    let stockManagementRepository: StockManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockManagementEntity: StockManagementEntity

    beforeEach(() => {

        props = {
            productStockId: "any_product_stock_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        stockManagementEntity = mock<StockManagementEntity>({
            id: props.productStockId,
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

    it("Should return ProductStockAlreadyIsAutoError if product stock is already auto", async () => {
        jest.spyOn(stockManagementEntity, "isStockAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockAlreadyIsAutoError")
    })

    it("Should call toStockAuto from stockManagementEntity", async () => {
        await sut.execute(props)
        expect(stockManagementEntity.toStockAuto).toBeCalledTimes(1)
    })

    it("Should call productStockRepository.update once", async () => {
        await sut.execute(props)
        expect(stockManagementRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create StockTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockTypeChangedToAutoEvent).toBeCalledWith(props)
    })

})