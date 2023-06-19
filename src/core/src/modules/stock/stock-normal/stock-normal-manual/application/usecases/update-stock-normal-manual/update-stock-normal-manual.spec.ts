import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockNormalManualRepositoryInterface } from "../../../domain/repositories"
import { UpdateStockNormalManualUsecaseInterface } from "../../../domain/usecases"
import { UpdateStockNormalManualUsecase } from "./update-stock-normal-manual.usecase"
import { StockNormalManualEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { StockNormalManualUpdatedEvent } from "./stock-normal-manual-updated.event"

jest.mock("./stock-normal-manual-updated.event")

describe("Test UpdateStockNormalManualUsecase", () => {

    let sut: UpdateStockNormalManualUsecase
    let props: UpdateStockNormalManualUsecaseInterface.InputDto
    let stockNormalManualRepository: StockNormalManualRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalManualEntity: StockNormalManualEntity

    beforeEach(() => {

        props = {
            stockNormalManualId: "any_stock_normal_manual_id",
            stock: 10
        }
        stockNormalManualEntity = mock<StockNormalManualEntity>({
            updateStock: () => ({ isLeft: () => false } as any)
        })
        stockNormalManualRepository = mock<StockNormalManualRepositoryInterface>({
            findById: async () => stockNormalManualEntity
        }) 
        eventEmitter = mock<EventEmitterInterface>()
        sut = new UpdateStockNormalManualUsecase(stockNormalManualRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockNormalManualNotFoundError entity is not found by repository", async () => {
        jest.spyOn(stockNormalManualRepository, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("StockNormalManualNotFoundError")
    })

    it("Should call updateStock method from StockNormalManualEntity", async () => {
        jest.spyOn(stockNormalManualEntity, "updateStock")
        await sut.execute(props)
        expect(stockNormalManualEntity.updateStock).toBeCalledWith(props.stock)
    })

    it("Should return error if updateStock method from StockNormalManualEntity returns left", async () => {
        const updateError = new Error("UpdateError")
        jest.spyOn(stockNormalManualEntity, "updateStock")
        .mockReturnValueOnce({ isLeft: () => true, value: [ updateError ] } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ updateError ])
    })

    it("Should call update method from StockNormalManualRepository", async () => {
        await sut.execute(props)
        expect(stockNormalManualRepository.update).toBeCalledWith(stockNormalManualEntity)
        expect(stockNormalManualRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create  StockNormalManualUpdatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalManualUpdatedEvent).toBeCalledWith({
            stockNormalManualId: stockNormalManualEntity.id,
            stock: stockNormalManualEntity.getCurrentStock()
        })
    })
})