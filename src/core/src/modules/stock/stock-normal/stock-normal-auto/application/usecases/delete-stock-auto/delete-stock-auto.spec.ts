
import { DeleteStockAutoUsecase } from "./delete-stock-auto.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockAutoDeletedEvent } from "./stock-auto-deleted.event"
import { DeleteStockAutoUsecaseInterface } from "../../../domain/usecases";
import { StockAutoRepositoryInterface } from "../../../domain/repository"

jest.mock("./stock-auto-deleted.event")

describe("Test DeleteAutoStockUsecase", () => {

    let sut: DeleteStockAutoUsecase
    let props: DeleteStockAutoUsecaseInterface.InputDto
    let stockAutoRepository: StockAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeEach(() => {
        props = {
            stockAutoId: "any_stock_id"
        }
        stockAutoRepository = mock<StockAutoRepositoryInterface>({
            findById: jest.fn().mockResolvedValue({ id: props.stockAutoId }),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteStockAutoUsecase(stockAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockAutoNotFoundError if the repository can not find the entity", async () => {
        jest.spyOn(stockAutoRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("StockAutoNotFoundError")
    })


    it("Should call productStockAutoRepository.delete once", async () => {
        await sut.execute(props)
        expect(stockAutoRepository.delete).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockAutoDeletedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockAutoDeletedEvent).toHaveBeenCalledWith(props)
    })
})