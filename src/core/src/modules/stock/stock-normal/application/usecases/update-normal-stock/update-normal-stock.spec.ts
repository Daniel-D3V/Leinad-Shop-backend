import { ProductStockNormalRepositoryInterface } from "@/modules/stock/domain/repositories"
import { UpdateNormalStockUsecase } from "./update-normal-stock.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ProductStockNormalEntity } from "@/modules/stock/domain/entities"
import { left } from "@/modules/@shared/logic"
import { UpdateNormalStockUsecaseInterface } from "../../../domain/usecases"
import { StockNormalRepositoryInterface } from "../../../domain/repositories"
import { StockNormalEntity } from "../../../domain/entities"
import { StockNormalUpdatedEvent } from "./stock-normal-updated.event"

jest.mock("./stock-normal-updated.event")

describe("Test StockNormalUpdatedEvent", () => {

    let sut: UpdateNormalStockUsecase
    let props: UpdateNormalStockUsecaseInterface.InputDto
    let stockNormalRepository: StockNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalEntity: StockNormalEntity

    beforeEach(() => {

        props = {
            id: "any_id",
            newStock: 10
        }
        stockNormalEntity = mock<StockNormalEntity>({
            updateStock: () => ({
                isLeft: () => false
            }),
            id: props.id,
            getCurrentStock: () => props.newStock
        } as any)
        stockNormalRepository = mock<StockNormalRepositoryInterface>()
        jest.spyOn(stockNormalRepository, "findById")
            .mockResolvedValue(stockNormalEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new UpdateNormalStockUsecase(stockNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockNormalNotFoundError if stock normal could not be found by the repository", async () => {
        jest.spyOn(stockNormalRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("StockNormalNotFoundError")
    })

    it("Should return an error if stockNormalEntity updateStock returns an error", async () => {
        const productUpdateError = new Error("ProductUpdateError")
        jest.spyOn(stockNormalEntity, "updateStock").mockReturnValueOnce(left([productUpdateError]))
        const output = await sut.execute(props)
        expect(output.value![0]).toEqual(productUpdateError)
    })

    it("Should call stockNormalEntity.updateStock with correct values", async () => {
        const stockNormalEntitySpy = jest.spyOn(stockNormalEntity, "updateStock")
        await sut.execute(props)
        expect(stockNormalEntitySpy).toHaveBeenCalledWith(props.newStock)
    })

    it("Should call stockNormalRepository.update once", async () => {
        await sut.execute(props)
        expect(stockNormalRepository.findById).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockNormalUpdatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalUpdatedEvent).toHaveBeenCalledWith(props)
    })


})