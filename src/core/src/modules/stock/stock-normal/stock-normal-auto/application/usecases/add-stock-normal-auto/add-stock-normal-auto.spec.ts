import { AddStockNormalAutoUsecase } from "./add-stock-normal-auto.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AddStockNormalAutoUsecaseInterface } from "../../../domain/usecases"
import { StockNormalAutoEntity } from "../../../domain/entities"
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository"
import { StockNormalAutoAddedEvent } from "./stock-normal-auto-added.event"

jest.mock("./stock-normal-auto-added.event")

describe("test AddAutoStockUsecase", () => {

    let sut: AddStockNormalAutoUsecase
    let props: AddStockNormalAutoUsecaseInterface.InputDto
    let stockNormalAutoRepository: StockNormalAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalAutoEntity: StockNormalAutoEntity

    beforeEach(() => {
        props = {
            value: "any_value",
            stockNormalManagementId: "any_stock_normal_management_id"
        }
        stockNormalAutoEntity = mock<StockNormalAutoEntity>()
        jest.spyOn(StockNormalAutoEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: stockNormalAutoEntity } as any)

        stockNormalAutoRepository = mock<StockNormalAutoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new AddStockNormalAutoUsecase(stockNormalAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if stockNormalAutoEntity returns an error on its creation", async () => {
        const entityError = new Error("EntityError")
        jest.spyOn(StockNormalAutoEntity, "create")
            .mockReturnValue({
                isLeft: () => true,
                value: [entityError]
            } as any)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not return right")
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should call stockNormalAutoRepository.create once", async () => {
        await sut.execute(props)
        expect(stockNormalAutoRepository.create).toHaveBeenCalledTimes(1)
    })

    

    it("Should create StockNormalAutoAddedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalAutoAddedEvent).toHaveBeenCalledWith({ ...stockNormalAutoEntity.toJSON() })
    })
})