import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories"
import { AddStockItemAutoUsecaseInterface } from "../../../domain/usecases"
import { AddStockItemAutoUsecase } from "./add-stock-item-auto.usecase"
import { StockItemAutoEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { StockItemAutoAddedEvent } from "./stock-item-auto-added.event"

jest.mock("./stock-item-auto-added.event")

describe("Test AddStockItemAutoUsecase", () => {

    let sut: AddStockItemAutoUsecase
    let props: AddStockItemAutoUsecaseInterface.InputDto
    let stockItemAutoRepository: StockItemAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemAutoEntity: StockItemAutoEntity

    beforeEach(() => {

        props = {
            announceItemId: "any_announce_item_id",
            value: "any_value"
        }

        stockItemAutoEntity = mock<StockItemAutoEntity>()
        jest.spyOn(StockItemAutoEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: stockItemAutoEntity } as any)

        stockItemAutoRepository = mock<StockItemAutoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new AddStockItemAutoUsecase(stockItemAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return an errro if StockItemAutoEntity.create return an error", async () => {
        const entityError = new Error("")
        jest.spyOn(StockItemAutoEntity, "create")
        .mockReturnValue({ isLeft: () => true, value: [ entityError ] } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityError ])
    })

    it("Should call StockItemAutoRepository.create with correct input", async () => {
        await sut.execute(props)
        expect(stockItemAutoRepository.create).toHaveBeenCalledWith(stockItemAutoEntity)
        expect(stockItemAutoRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemAutoAddedEvent with correct values", async () => {
        const output = await sut.execute(props)
        expect(StockItemAutoAddedEvent).toHaveBeenCalledWith({ ...stockItemAutoEntity.toJSON() })
    })
})