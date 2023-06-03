import { AddStockAutoUsecase } from "./add-stock-auto.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockAutoRepositoryInterface } from "../../../domain/repository"
import { StockAutoEntity } from "../../../domain/entities"
import { AddStockAutoUsecaseInterface } from "../../../domain/usecases";
import { StockAutoAddedEvent } from "./stock-auto-added.event"

jest.mock("./stock-auto-added.event")
jest.mock("../../../domain/entities")

describe("test AddAutoStockUsecase", () => {

    let sut: AddStockAutoUsecase
    let props: AddStockAutoUsecaseInterface.InputDto
    let stockAutoRepository: StockAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockAutoEntity: StockAutoEntity

    beforeEach(() => {
        props = {
            value: "any_value",
            announceId: "any_announce_id"
        }
        stockAutoEntity = mock<StockAutoEntity>({
            id: "any_id",
            getValue: () => props.value
        })
        jest.spyOn(StockAutoEntity, "create")
        .mockReturnValue({
            isLeft: () => false,
            value: stockAutoEntity
        } as any)

        stockAutoRepository = mock<StockAutoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new AddStockAutoUsecase(stockAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if stockAutoEntity returns an error on its creation", async () => {
        const entityError = new Error("EntityError")
        jest.spyOn(StockAutoEntity, "create")
            .mockReturnValue({
                isLeft: () => true,
                value: [entityError]
            } as any)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not return right")
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should call stockAutoRepository.create once", async () => {
        await sut.execute(props)
        expect(stockAutoRepository.create).toHaveBeenCalledTimes(1)
    })

    

    it("Should create StockAutoAddedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockAutoAddedEvent).toHaveBeenCalledWith({
            id: stockAutoEntity.id,
            value: stockAutoEntity.getValue()
        })
    })
})