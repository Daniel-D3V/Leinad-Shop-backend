import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories"
import { DeleteStockItemAutoUsecaseInterface } from "../../../domain/usecases"
import { DeleteStockItemAutoUsecase } from "./delete-stock-item-auto.usecase"
import { StockItemAutoEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { StockItemAutoDeletedEvent } from "./stock-item-auto-deleted.event"

jest.mock("./stock-item-auto-deleted.event")

describe('Test DeleteStockItemAutoUsecase', () => { 

    let sut: DeleteStockItemAutoUsecase
    let props: DeleteStockItemAutoUsecaseInterface.InputDto
    let stockItemAutoRepository: StockItemAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemAutoEntity: StockItemAutoEntity

    beforeEach(() => {

        props = {
            stockItemAutoId: "any_stock_item_auto_id"
        }
        stockItemAutoEntity = mock<StockItemAutoEntity>()
        stockItemAutoRepository = mock<StockItemAutoRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(stockItemAutoEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteStockItemAutoUsecase(stockItemAutoRepository, eventEmitter)
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

    it("Should call stockItemAutoRepository.delete with correct params", async () => {
        await sut.execute(props)
        expect(stockItemAutoRepository.delete).toHaveBeenCalledWith(stockItemAutoEntity.id)
        expect(stockItemAutoRepository.delete).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemAutoDeletedEvent with correct params", async () => {
        await sut.execute(props)
        expect(StockItemAutoDeletedEvent).toHaveBeenCalledWith({
            stockItemAutoId: stockItemAutoEntity.id
        })
    })
})