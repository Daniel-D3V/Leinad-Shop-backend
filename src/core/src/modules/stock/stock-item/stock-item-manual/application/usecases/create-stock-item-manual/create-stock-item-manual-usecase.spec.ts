import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemManualRepositoryInterface } from "../../../domain/repositories"
import { CreateStockItemManualUsecaseInterface } from "../../../domain/usecases"
import { CreateStockItemManualUsecase } from "./create-stock-item-manual.usecase"
import { StockItemManualEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { StockItemManualCreatedEvent } from "./stock-item-manual-created.event"

jest.mock("./stock-item-manual-created.event")

describe("Test CreateStockItemManualUsecase", () => {

    let sut: CreateStockItemManualUsecase
    let props: CreateStockItemManualUsecaseInterface.InputDto
    let stockItemManualRepository: StockItemManualRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemManualEntity: StockItemManualEntity


    beforeEach(() => {

        props = {
            stock: 10,
            announceItemId: "any_announce_item_id"
        }
        stockItemManualEntity = mock<StockItemManualEntity>()
        jest.spyOn(StockItemManualEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: stockItemManualEntity } as any)

        stockItemManualRepository = mock<StockItemManualRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateStockItemManualUsecase(stockItemManualRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return an error if StockItemManualEntity.create return left", async () => {
        const entityError = new Error("entity_error")
        jest.spyOn(StockItemManualEntity, "create")
        .mockReturnValue({ isLeft: () => true, value: [ entityError ] } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityError ])
    })

    it("Should return StockItemManagementManualAlreadyCreatedError if a normal entity was already created", async () => {
        jest.spyOn(stockItemManualRepository, "findByAnnounceItemId")
        .mockResolvedValueOnce(stockItemManualEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not return right")
        expect(output.value[0].name).toBe("StockItemManagementManualAlreadyCreatedError")
    })

    it("Should call stockItemManualRepository.create with the right params", async () => {
        await sut.execute(props)
        expect(stockItemManualRepository.create).toBeCalledWith(stockItemManualEntity)
        expect(stockItemManualRepository.create).toBeCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create StockItemManualCreatedEvent with the right params", async () => {
        await sut.execute(props)
        expect(StockItemManualCreatedEvent).toBeCalledWith({ ...stockItemManualEntity.toJSON() })
    })
})