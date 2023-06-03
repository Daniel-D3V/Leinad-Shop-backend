import { UpdateStockItemNormalUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { UpdateStockItemNormalUsecase } from "./update-stock-item-normal.usecase"
import { StockItemNormalRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockItemNormalEntity } from "@/modules/stock/_base"
import { StockItemNormalUpdatedEvent } from "./stock-item-normal-updated.event"

jest.mock("./stock-item-normal-updated.event")

describe("Test UpdateStockItemNormal", () => {

    let sut: UpdateStockItemNormalUsecase
    let props: UpdateStockItemNormalUsecaseInterface.InputDto
    let stockItemNormalRepository: StockItemNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemNormalEntity: StockItemNormalEntity

    beforeEach(() => {

        props = {
            stockItemNormalId: "any_id",
            stock: 10
        }
        stockItemNormalEntity = mock<StockItemNormalEntity>({
            id: props.stockItemNormalId,
            getCurrentStock: () => 10,
            updateStock: () => ({
                isLeft: () => false
            }) as any
        })
        stockItemNormalRepository = mock<StockItemNormalRepositoryInterface>({
            findById: async () => stockItemNormalEntity
        })
        eventEmitter = mock<EventEmitterInterface>()

        sut = new UpdateStockItemNormalUsecase(stockItemNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBeTruthy()
    })

    it("Should return StockItemNormalNotFoundError if stockItemNormal not found", async () => {
        jest.spyOn(stockItemNormalRepository, "findById").mockResolvedValueOnce(null)
        const result = await sut.execute(props)
        expect(result.isLeft()).toBeTruthy()
    })

    it("Should return error if updateStock return error", async () => {
        const updateStockError = new Error("UpdateStockError")
        jest.spyOn(stockItemNormalEntity, "updateStock").mockReturnValueOnce({
            isLeft: () => true,
            value: [ updateStockError ]
        } as any)
        const result = await sut.execute(props)
        expect(result.value).toEqual([ updateStockError ])
    })

    it("Should call stockItemNormalRepository.update", async () => {
        await sut.execute(props)
        expect(stockItemNormalRepository.update).toBeCalledWith(stockItemNormalEntity)
        expect(stockItemNormalRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemNormalUpdatedEvent with correct params", async () => {
        await sut.execute(props)
        expect(StockItemNormalUpdatedEvent).toHaveBeenCalledWith({
            stockItemNormalId: stockItemNormalEntity.id,
            stock: stockItemNormalEntity.getCurrentStock()
        })
    })
})