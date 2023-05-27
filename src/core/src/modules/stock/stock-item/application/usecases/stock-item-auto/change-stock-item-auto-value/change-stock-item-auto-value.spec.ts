import { ChangeStockItemAutoValueUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { ChangeStockItemAutoValueUsecase } from "./change-stock-item-auto-value.usecase"
import { StockItemAutoRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemAutoEntity } from "@/modules/stock/_base"
import { mock } from "jest-mock-extended"
import { StockItemAutoValueChangedEvent } from "./stock-item-auto-value-changed.event"

jest.mock("./stock-item-auto-value-changed.event")

describe('Test ChangeStockItemAutoValueUsecase', () => { 

    let sut: ChangeStockItemAutoValueUsecase
    let props: ChangeStockItemAutoValueUsecaseInterface.InputDto
    let stockItemAutoRepository: StockItemAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemAutoEntity: StockItemAutoEntity

    beforeEach(() => {
        props = {
            stockItemAutoId: "any_stock_item_auto_id",
            value: "any_value"
        }
        stockItemAutoEntity = mock<StockItemAutoEntity>({
            changeValue: () => ({isLeft: () => false}) as any
        })
        stockItemAutoRepository = mock<StockItemAutoRepositoryInterface>({
            findById: async () => stockItemAutoEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeStockItemAutoValueUsecase(stockItemAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockItemAutoNotFoundError if stockItemAutoEntity is not found", async () => {
        jest.spyOn(stockItemAutoRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("StockItemAutoNotFoundError")
    })

    it("Should return error if changeValue return error", async () => {
        const changeValueError = new Error("changeValueError")
        jest.spyOn(stockItemAutoEntity, "changeValue").mockReturnValueOnce({
            isLeft: () => true,
            value: [ changeValueError ]
        } as any)
        const result = await sut.execute(props)
        expect(result.value).toEqual([ changeValueError ])
    })

    it("Should call stockItemAutoRepository.update once", async () => {
        await sut.execute(props)
        expect(stockItemAutoRepository.update).toHaveBeenCalledWith(stockItemAutoEntity)
        expect(stockItemAutoRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemAutoValueChangedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemAutoValueChangedEvent).toHaveBeenCalledWith({
            stockItemAutoId: stockItemAutoEntity.id,
            value: stockItemAutoEntity.getValue()
        })
    })


})