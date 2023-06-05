import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories"
import { ChangeStockItemAutoValueUsecaseInterface } from "../../../domain/usecases"
import { ChangeStockItemAutoValueUsecase } from "./change-stock-item-value.usecase"
import { StockItemAutoEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { StockItemAutoValueChangedEvent } from "./stock-item-auto-value-changed.event"

jest.mock("./stock-item-auto-value-changed.event")

describe("Test ChangeStockItemAutoValueUsecase", () => {

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
            changeValue: () => ({ isLeft: () => false } as any),
        })
        stockItemAutoRepository = mock<StockItemAutoRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(stockItemAutoEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeStockItemAutoValueUsecase(stockItemAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockItemAutoNotFoundError if stock item auto not found", async () => {
        jest.spyOn(stockItemAutoRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("StockItemAutoNotFoundError")
    })

    it("Should return an error if stock item auto change value fails", async () => {
        const error = new Error("any_error")
        jest.spyOn(stockItemAutoEntity, "changeValue")
        .mockReturnValueOnce({ isLeft: () => true, value: [error] } as any)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0]).toBe(error)
    })

    it("Should call stockItemAutoRepository.update with the correct value", async () => {
        await sut.execute(props)
        expect(stockItemAutoRepository.update).toHaveBeenCalledWith(stockItemAutoEntity)
        expect(stockItemAutoRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemAutoValueChangedEvent with the correct value", async () => {
        await sut.execute(props)
        expect(StockItemAutoValueChangedEvent).toHaveBeenCalledWith({
            stockItemAutoId: stockItemAutoEntity.id,
            value: stockItemAutoEntity.getValue()
        })
    })
})