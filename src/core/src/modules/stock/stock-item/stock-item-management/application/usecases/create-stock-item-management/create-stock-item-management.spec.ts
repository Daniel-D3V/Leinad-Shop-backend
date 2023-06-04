import { InitializeStockItemUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities"
import { StockItemCreatedEvent } from "./stock-item-management-created.event"
import { InitializeStockItemUsecase } from "./initialize-stock-item-usecase"

jest.mock("./stock-item-created.event")

describe("Test CreateStockItemUsecase", () => {

    let sut: InitializeStockItemUsecase
    let props: InitializeStockItemUsecaseInterface.InputDto
    let stockItemRepository: StockItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemEntity: StockItemEntity

    beforeEach(() => {

        props = {
            announceItemId: "any_announce_item_id",

        }
        stockItemEntity = mock<StockItemEntity>({
            id: "any_id",
        } as any)
        jest.spyOn(StockItemEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: stockItemEntity
        } as any)
        stockItemRepository = mock<StockItemRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new InitializeStockItemUsecase(stockItemRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {    
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return a left if StockItemEntity.create() returns a left", async () => {
        const entityCreationError = new Error("any_error")
        jest.spyOn(StockItemEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: [ entityCreationError ] 
        } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityCreationError ])
    })

    it("Should return StockItemAlreadyCreatedError if StockItemRepository.findByAnnounceItemId() returns a value", async () => {
        
        jest.spyOn(stockItemRepository, "findByAnnounceItemId").mockResolvedValueOnce(stockItemEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should return a left")
        expect(output.value[0].name).toBe("StockItemAlreadyCreatedError")
    })

    it("Should call StockItemRepository.create() once", async () => {
        await sut.execute(props)
        expect(stockItemRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once",async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockItemCreatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemCreatedEvent).toHaveBeenCalledWith({ ...stockItemEntity.toJSON() })
    })
})