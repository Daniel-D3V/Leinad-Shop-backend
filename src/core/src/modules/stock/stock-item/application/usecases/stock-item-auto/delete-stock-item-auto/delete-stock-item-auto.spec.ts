import { DeleteStockItemAutoUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { DeleteStockItemAutoUsecase } from "./delete-stock-item-auto.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemAutoEntity } from "@/modules/stock/_base"
import { mock } from "jest-mock-extended"
import { StockItemAutoRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { StockItemAutoDeletedEvent } from "./stock-item-auto-deleted.event"

jest.mock("./stock-item-auto-deleted.event")

describe("Test DeleteStockItemAutoUsecase", () => {

    let sut: DeleteStockItemAutoUsecase
    let props: DeleteStockItemAutoUsecaseInterface.InputDto
    let stockItemAutoRepository: StockItemAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemAutoEntity: StockItemAutoEntity

    beforeEach(() => {

        props = {
            stockItemAutoId: "any_stock_item_auto_id"
        }
        stockItemAutoEntity = mock<StockItemAutoEntity>({
            id: "any_id"
        })
        stockItemAutoRepository = mock<StockItemAutoRepositoryInterface>({
            findById: async () => stockItemAutoEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteStockItemAutoUsecase(stockItemAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBeTruthy()
    } )

    it("Should return StockItemAutoNotFoundError if stockItemAutoRepository.findById returns null", async () => {
        jest.spyOn(stockItemAutoRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)

        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemAutoNotFoundError")
    })

    it("Should call stockItemAutoRepository.delete with the correct params", async () => {
        await sut.execute(props)
        expect(stockItemAutoRepository.delete).toBeCalledWith(stockItemAutoEntity.id)
        expect(stockItemAutoRepository.delete).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create a StockItemAutoDeletedEvent with the correct params", async () => {
        await sut.execute(props)
        expect(StockItemAutoDeletedEvent).toHaveBeenCalledWith({
            stockItemAutoId: stockItemAutoEntity.id
        })
    })
})