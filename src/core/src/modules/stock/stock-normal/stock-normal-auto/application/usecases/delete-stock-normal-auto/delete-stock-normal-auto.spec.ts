
import { DeleteStockNormalAutoUsecase } from "./delete-stock-normal-auto.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { DeleteStockNormalAutoUsecaseInterface } from "../../../domain/usecases"
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository"
import { StockNormalAutoDeletedEvent } from "./stock-normal-auto-deleted.event"


jest.mock("./stock-normal-auto-deleted.event")

describe("Test DeleteAutoStockUsecase", () => {

    let sut: DeleteStockNormalAutoUsecase
    let props: DeleteStockNormalAutoUsecaseInterface.InputDto
    let stockNormalAutoRepository: StockNormalAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeEach(() => {
        props = {
            stockNormalAutoId: "stock_normal_auto_id"
        }
        stockNormalAutoRepository = mock<StockNormalAutoRepositoryInterface>({
            findById: jest.fn().mockResolvedValue({ id: props.stockNormalAutoId }),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteStockNormalAutoUsecase(stockNormalAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockAutoNotFoundError if the repository can not find the entity", async () => {
        jest.spyOn(stockNormalAutoRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("StockAutoNotFoundError")
    })


    it("Should call productStockAutoRepository.delete once", async () => {
        await sut.execute(props)
        expect(stockNormalAutoRepository.delete).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockNormalAutoDeletedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalAutoDeletedEvent).toHaveBeenCalledWith(props)
    })
})