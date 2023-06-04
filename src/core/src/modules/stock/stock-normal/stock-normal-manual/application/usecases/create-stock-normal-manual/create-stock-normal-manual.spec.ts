import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { StockNormalManualEntity } from "../../../domain/entities"
import { StockNormalManualRepositoryInterface } from "../../../domain/repositories"
import { CreateStockManualUsecaseInterface } from "../../../domain/usecases"
import { CreateStockNormalManualUsecase } from "./create-stock-normal-manual.usecase"
import { StockNormalManualCreatedEvent } from "./stock-normal-manual-created.event"


jest.mock("./stock-normal-manual-created.event")

describe("Test CreateProductStockNormalUsecase", () => {

    let sut: CreateStockNormalManualUsecase
    let props: CreateStockManualUsecaseInterface.InputDto
    let stockNormalManualRepository: StockNormalManualRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalManualEntity: StockNormalManualEntity

    beforeEach(() => {
        props = {
            stockNormalManagementId: "any_stock_normal_management_id",
            stock: 10
        }
        stockNormalManualRepository = mock<StockNormalManualRepositoryInterface>()
        
        stockNormalManualEntity = mock<StockNormalManualEntity>()
        jest.spyOn(StockNormalManualEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: stockNormalManualEntity } as any)
        jest.spyOn(stockNormalManualRepository, "findByStockNormalManagementId").mockResolvedValue(null)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateStockNormalManualUsecase(stockNormalManualRepository , eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return left if stockNormalManualEntity.create return left", async () => {
        jest.spyOn(StockNormalManualEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: ["any_error"]
        } as any)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual(["any_error"])
    })


    it("Should return StockManualAlreadyCreatedError if stock manual already exists", async () => {
        jest.spyOn(stockNormalManualRepository, "findByStockNormalManagementId").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManualAlreadyCreatedError")
    })

    it("Should call create from stockNormalManualRepository.create", async () => {
        await sut.execute(props)
        expect(stockNormalManualRepository.create).toBeCalledTimes(1)
    })

    it("Should call emit from eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create a StockNormalManualCreatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalManualCreatedEvent).toHaveBeenCalledWith({ ...stockNormalManualEntity.toJSON() })
    })

})