import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemManualEntity } from "../../../domain/entities"
import { StockItemManualRepositoryInterface } from "../../../domain/repositories"
import { UpdateStockItemManualUsecaseInterface } from "../../../domain/usecases"
import { UpdateStockItemManualUsecase } from "./update-stock-item-manual.usecase"
import { mock } from "jest-mock-extended"
import { StockItemManualUpdatedEvent } from "./stock-item-manual-updated.event"

jest.mock("./stock-item-manual-updated.event")

describe("Test UpdateStockItemManualUsecase", () => {

    let sut: UpdateStockItemManualUsecase
    let props: UpdateStockItemManualUsecaseInterface.InputDto
    let stockItemManualRepository: StockItemManualRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemManualEntity: StockItemManualEntity

    beforeEach(() => {

        props = {
            stockItemManualId: "stock_item_manual_id",
            stock: 10
        }
        stockItemManualEntity = mock<StockItemManualEntity>({
            updateStock: () => ({ isLeft: () => false } as any)
        })
        stockItemManualRepository = mock<StockItemManualRepositoryInterface>({
            findById: async () => stockItemManualEntity,
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new UpdateStockItemManualUsecase(stockItemManualRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockItemManualNotFoundError if stockItemManualEntity is null", async () => {
        jest.spyOn(stockItemManualRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("StockItemManualNotFoundError")
    })

    it("Should return ana error if updateStock returns left", async () => {
        jest.spyOn(stockItemManualEntity, "updateStock")
        .mockReturnValueOnce({ isLeft: () => true, value: "error" } as any)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value).toBe("error")
    })

    it("Should call updateStockItemManualRepository.update once", async () => {
        await sut.execute(props)
        expect(stockItemManualRepository.update).toHaveBeenCalledWith(stockItemManualEntity)
        expect(stockItemManualRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemManualUpdatedEvent", async () => {
        await sut.execute(props)
        expect(StockItemManualUpdatedEvent).toHaveBeenCalledWith({
            stockItemManualId: stockItemManualEntity.id,
            stock: stockItemManualEntity.getCurrentStock()
        })
    })
})