import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockManualEntity } from "../../../domain/entities"
import { StockManualRepositoryInterface } from "../../../domain/repositories"
import { CreateStockManualUsecaseInterface } from "../../../domain/usecases"
import { CreateStockManualUsecase } from "./create-stock-manual.usecase"
import { StockManualCreatedEvent } from "./stock-manual-created.event"


jest.mock("./stock-manual-created.event")
jest.mock("../../../domain/entities")

describe("Test CreateProductStockNormalUsecase", () => {

    let sut: CreateStockManualUsecase
    let props: CreateStockManualUsecaseInterface.InputDto
    let stockManualRepository: StockManualRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockManualEntity: StockManualEntity

    beforeEach(() => {
        props = {
            stockManagementId: "any_stock_management_id",
            stock: 10
        }
        stockManualRepository = mock<StockManualRepositoryInterface>()
        
        stockManualEntity = mock<StockManualEntity>()
        jest.spyOn(stockManualRepository, "findByStockManagementId").mockResolvedValue(null)
        jest.spyOn(StockManualEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: stockManualEntity
        } as any)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateStockManualUsecase(stockManualRepository , eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return left if stockManualEntity.create return left", async () => {
        jest.spyOn(StockManualEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: ["any_error"]
        } as any)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual(["any_error"])
    })


    it("Should return StockManualAlreadyCreatedError if stock manual already exists", async () => {
        jest.spyOn(stockManualRepository, "findByStockManagementId").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManualAlreadyCreatedError")
    })

    it("Should call create from stockManualRepository.create", async () => {
        await sut.execute(props)
        expect(stockManualRepository.create).toBeCalledTimes(1)
    })

    it("Should call emit from eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create a StockNormalInitializedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockManualCreatedEvent).toHaveBeenCalledWith({ ...stockManualEntity.toJSON() })
    })

})