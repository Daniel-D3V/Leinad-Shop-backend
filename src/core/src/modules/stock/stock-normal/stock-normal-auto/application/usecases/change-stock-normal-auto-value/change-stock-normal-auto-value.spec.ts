
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"

import { StockAutoNormalValueChangedEvent } from "./stock-normal-auto-value-changed.event";
import { ChangeStockNormalAutoValueUsecase } from "./change-stock-normal-auto-value.usecase";
import { ChangeStockNormalAutoValueUsecaseInterface } from "../../../domain/usecases";
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository";
import { StockNormalAutoEntity } from "../../../domain/entities";

jest.mock("./stock-normal-auto-value-changed.event")

describe("Test ChangeStockNormalAutoValueUsecase", () => {

    let sut: ChangeStockNormalAutoValueUsecase
    let props: ChangeStockNormalAutoValueUsecaseInterface.InputDto
    let stockNormalAutoRepository: StockNormalAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalAutoEntity: StockNormalAutoEntity

    beforeEach(() => {
        props = {
            stockNormalAutoId: "stock_normal_auto_id",
            value: "any_value"
        }
        stockNormalAutoEntity = mock<StockNormalAutoEntity>()
        stockNormalAutoRepository = mock<StockNormalAutoRepositoryInterface>()
        jest.spyOn(stockNormalAutoRepository, "findById")
        .mockResolvedValue(stockNormalAutoEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeStockNormalAutoValueUsecase(stockNormalAutoRepository, eventEmitter)
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockAutoNotFoundError if the repository can not find the entity", async () => {
        jest.spyOn(stockNormalAutoRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("StockAutoNotFoundError")
    })

    it("Should call changeValue from stockNormalAutoEntity once ", async () => {
        await sut.execute(props)
        expect(stockNormalAutoEntity.changeValue).toHaveBeenCalledTimes(1)
    })

    it("Should call stockAutoRepository.update", async () => {
        await sut.execute(props)
        expect(stockNormalAutoRepository.update).toHaveBeenCalledTimes(1)
        expect(stockNormalAutoRepository.update).toHaveBeenCalledWith(stockNormalAutoEntity)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockAutoNormalValueChangedEvent with correct value", async () => {
        await sut.execute(props)
        expect(StockAutoNormalValueChangedEvent).toHaveBeenCalledWith({
            stockNormalAutoId: stockNormalAutoEntity.id,
            value: stockNormalAutoEntity.getValue()
        })
    })
})