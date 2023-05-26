import { CreateProductStockNormalUsecase } from "./create-stock-normal-stock.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockNormalCreatedEvent } from "./stock-normal-created.event"
import { CreateNormalStockUsecaseInterface } from "../../../domain/usecases"
import { StockNormalEntity } from "../../../domain/entities"
import { StockNormalRepositoryInterface } from "../../../domain/repositories"


jest.mock("./stock-normal-created.event")
jest.mock("@/modules/stock/domain/entities")

describe("Test CreateProductStockNormalUsecase", () => {

    let sut: CreateProductStockNormalUsecase
    let props: CreateNormalStockUsecaseInterface.InputDto
    let stockNormalRepository: StockNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalEntity: StockNormalEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id"
        }
        stockNormalRepository = mock<StockNormalRepositoryInterface>()
        
        stockNormalEntity = mock<StockNormalEntity>({
            id: "any_id",
            announceId: props.announceId,
            getCurrentStock: () => 0
        })
        jest.spyOn(stockNormalRepository, "findByAnnounceId").mockResolvedValue(null)
        jest.spyOn(StockNormalEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: stockNormalEntity
        } as any)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateProductStockNormalUsecase(stockNormalRepository , eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return left if StockNormalEntity.create return left", async () => {
        jest.spyOn(StockNormalEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: ["any_error"]
        } as any)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual(["any_error"])
    })


    it("Should return StockNormalAlreadyCreatedError if product stock normal already exists", async () => {
        jest.spyOn(stockNormalRepository, "findByAnnounceId").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockNormalAlreadyCreatedError")
    })

    it("Should call create from stockNormalRepository.create", async () => {
        await sut.execute(props)
        expect(stockNormalRepository.create).toBeCalledTimes(1)
    })

    it("Should call emit from eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create a StockNormalCreatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalCreatedEvent).toHaveBeenCalledWith(expect.objectContaining({
            id: stockNormalEntity.id,
            stock: 0,
            announceId: props.announceId 
        }))
    })

})