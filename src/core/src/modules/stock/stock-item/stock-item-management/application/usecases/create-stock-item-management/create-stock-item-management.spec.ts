import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import {  StockItemManagementCreatedEvent } from "./stock-item-management-created.event"
import { CreateStockItemManagementUsecase } from "./create-stock-item-management-usecase"
import { CreateStockItemManagementUsecaseInterface } from "../../../domain/usecases"
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories"
import { StockItemManagementEntity } from "../../../domain/entities"

jest.mock("./stock-item-management-created.event")

describe("Test CreateStockItemUsecase", () => {

    let sut: CreateStockItemManagementUsecase
    let props: CreateStockItemManagementUsecaseInterface.InputDto
    let stockItemManagementRepository: StockItemManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemManagementEntity: StockItemManagementEntity

    beforeEach(() => {

        props = {
            announceItemId: "any_announce_item_id",

        }
        stockItemManagementEntity = mock<StockItemManagementEntity>()
        jest.spyOn(StockItemManagementEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: stockItemManagementEntity
        } as any)
        stockItemManagementRepository = mock<StockItemManagementRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateStockItemManagementUsecase(stockItemManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {    
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return a left if stockItemManagementEntity.create() returns a left", async () => {
        const entityCreationError = new Error("any_error")
        jest.spyOn(StockItemManagementEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: [ entityCreationError ] 
        } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityCreationError ])
    })

    it("Should return StockItemAlreadyCreatedError if stockItemManagementRepository.findByAnnounceItemId() returns a value", async () => {
        jest.spyOn(stockItemManagementRepository, "findByAnnounceItemId").mockResolvedValueOnce(stockItemManagementEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should return a right")
        expect(output.value[0].name).toBe("StockItemAlreadyCreatedError")
    })

    it("Should call stockItemManagementRepository.create() once", async () => {
        await sut.execute(props)
        expect(stockItemManagementRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once",async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemManagementCreatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemManagementCreatedEvent).toHaveBeenCalledWith({ ...stockItemManagementEntity.toJSON() })
    })
})