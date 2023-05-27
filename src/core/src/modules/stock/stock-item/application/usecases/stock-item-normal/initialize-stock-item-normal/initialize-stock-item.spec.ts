import { InitializeStockItemNormalUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { InitializeStockItemNormalUsecase } from "./initialize-stock-item-normal.usecase"
import { StockItemNormalRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockItemNormalEntity } from "@/modules/stock/_base"
import { StockItemNormalInitializedEvent } from "./stock-item-normal-initialized.event"

jest.mock("./stock-item-normal-initialized.event")

describe("Test InitializeStockItemNormalUsecase", () => {

    let sut: InitializeStockItemNormalUsecase
    let props: InitializeStockItemNormalUsecaseInterface.InputDto
    let stockItemNormalRepository: StockItemNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemNormalEntity: StockItemNormalEntity

    beforeEach(() => {

        props = {
            stockItemId: "stockItemId"
        }
        stockItemNormalEntity = mock<StockItemNormalEntity>({
            id: "any_id"
        })
        jest.spyOn(StockItemNormalEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: stockItemNormalEntity 
        } as any)
        stockItemNormalRepository = mock<StockItemNormalRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new InitializeStockItemNormalUsecase(stockItemNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return left if StockItemNormalEntity.create returns left", async () => {
        const entityCreationError = new Error("")
        jest.spyOn(StockItemNormalEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: [ entityCreationError ]
        } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityCreationError])
    })

    it("Should return left if StockItemNormalRepository.findByStockItemId returns a StockItemNormalEntity", async () => {
        jest.spyOn(stockItemNormalRepository, "findByStockItemId").mockResolvedValueOnce(stockItemNormalEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("StockItemNormalAlreadyInitializedError")
    })

    it("Should call StockItemNormalRepository.create once", async () => {
        await sut.execute(props)
        expect(stockItemNormalRepository.create).toHaveBeenCalledWith(stockItemNormalEntity)
        expect(stockItemNormalRepository.create).toBeCalledTimes(1)
    })

    it("Should call EventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create StockItemNormalInitializedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemNormalInitializedEvent).toHaveBeenCalledWith({
            ...stockItemNormalEntity.toJSON()
        })
    })
})