import { ChangeStockAutoValueUsecase } from "./change-stock-auto-value.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeStockAutoValueUsecaseInterface } from "../../../domain/usecases";
import { StockAutoRepositoryInterface } from "../../../domain/repository"
import { StockAutoEntity } from "../../../domain/entities"
import { StockAutoValueChangedEvent } from "./stock-auto-value-changed.event";

jest.mock("./stock-auto-value-changed.event")

describe("Test ChangeAutoStockValueUsecase", () => {

    let sut: ChangeStockAutoValueUsecase
    let props: ChangeStockAutoValueUsecaseInterface.InputDto
    let stockAutoRepository: StockAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockAutoEntity: StockAutoEntity

    beforeEach(() => {
        props = {
            stockAutoId: "any_stock_id",
            value: "any_value"
        }
        stockAutoEntity = mock<StockAutoEntity>({
            id: props.stockAutoId,
            getValue: () => props.value
        })
        stockAutoRepository = mock<StockAutoRepositoryInterface>()
        jest.spyOn(stockAutoRepository, "findById").mockResolvedValue(stockAutoEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeStockAutoValueUsecase(stockAutoRepository, eventEmitter)
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockAutoNotFoundError if the repository can not find the entity", async () => {
        jest.spyOn(stockAutoRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("StockAutoNotFoundError")
    })

    it("Should call changeValue from stockAutoEntity once ", async () => {
        await sut.execute(props)
        expect(stockAutoEntity.changeValue).toHaveBeenCalledTimes(1)
    })

    it("Should call stockAutoRepository.update", async () => {
        await sut.execute(props)
        expect(stockAutoRepository.update).toHaveBeenCalledTimes(1)
        expect(stockAutoRepository.update).toHaveBeenCalledWith(stockAutoEntity)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockAutoValueChangedEvent with correct value", async () => {
        await sut.execute(props)
        expect(StockAutoValueChangedEvent).toHaveBeenCalledWith(props)
    })
})