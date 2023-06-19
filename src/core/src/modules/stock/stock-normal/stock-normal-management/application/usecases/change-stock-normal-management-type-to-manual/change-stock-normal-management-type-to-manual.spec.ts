import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeStockNormalManagementTypeToManualUsecaseInterface } from "../../../domain/usecases"
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories"
import { StockNormalManagementEntity } from "../../../domain/entities"
import { ChangeStockNormalManagementTypeToManualUsecase } from "./change-stock-normal-management-type-to-manual.usecase"
import { StockNormalManagementTypeChangedToManualEvent } from "./stock-normal-management-type-changed-to-manual.event"

jest.mock("./stock-normal-management-type-changed-to-manual.event")

describe("Test ChangeStockTypeToNormalUsecase", () => {


    let sut: ChangeStockNormalManagementTypeToManualUsecase
    let props: ChangeStockNormalManagementTypeToManualUsecaseInterface.InputDto
    let stockNormalManagementRepository: StockNormalManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalManagementEntity: StockNormalManagementEntity

    beforeEach(() => {

        props = {
            stockNormalManagementId: "any_stock_normal_management_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        stockNormalManagementEntity = mock<StockNormalManagementEntity>()
        stockNormalManagementRepository = mock<StockNormalManagementRepositoryInterface>({
            findById: () => stockNormalManagementEntity
        } as any)

        sut = new ChangeStockNormalManagementTypeToManualUsecase(stockNormalManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockManagementNotFoundError if stock does not exists", async () => {
        jest.spyOn(stockNormalManagementRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManagementNotFoundError")
    })

    it("Should return StockManagementAlreadyIsManualError if product stock is already manual", async () => {
        jest.spyOn(stockNormalManagementEntity, "isStockManual").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManagementAlreadyIsManualError")
    })

    it("Should call toStockManual from stockNormalManagementEntity", async () => {
        await sut.execute(props)
        expect(stockNormalManagementEntity.toStockManual).toBeCalledTimes(1)
    })

    it("Should call stockNormalManagementRepository.update once", async () => {
        await sut.execute(props)
        expect(stockNormalManagementRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create StockNormalManagementTypeChangedToManualEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalManagementTypeChangedToManualEvent)
        .toBeCalledWith({ stockNormalManagementId: stockNormalManagementEntity.id })
    })

})