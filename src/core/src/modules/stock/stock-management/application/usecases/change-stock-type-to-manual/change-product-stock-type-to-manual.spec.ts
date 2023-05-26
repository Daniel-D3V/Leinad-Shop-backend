import { EventEmitterInterface } from "@/modules/@shared/events"
import { ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories"
import { ChangeProductStockTypeToManualUsecaseInterface } from "@/modules/stock/domain/usecases"
import { mock } from "jest-mock-extended"
import { ChangeStockTypeToManualUsecase } from "./change-product-stock-type-to-manual.usecase"
import { StockTypeChangedToManualEvent } from "./stock-type-changed-to-manual.event"
import { StockManagementEntity } from "../../domain/entities"
import { StockManagementRepositoryInterface } from "../../domain/repositories"


jest.mock("./stock-type-changed-to-manual.event")

describe("Test ChangeStockTypeToManualUsecase", () => {


    let sut: ChangeStockTypeToManualUsecase
    let props: ChangeProductStockTypeToManualUsecaseInterface.InputDto
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
        stockManagementRepository = mock<ProductStockRepositoryInterface>({
            findById: () => stockManagementEntity
        } as any)

        sut = new ChangeStockTypeToManualUsecase(stockManagementRepository, eventEmitter)
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

    it("Should return ProductStockAlreadyIsManualError if product stock is already auto", async () => {
        jest.spyOn(stockManagementEntity, "isStockNormal").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockAlreadyIsManualError")
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

    it("Should create StockTypeChangedToManualEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockTypeChangedToManualEvent).toBeCalledWith(props)
    })

})