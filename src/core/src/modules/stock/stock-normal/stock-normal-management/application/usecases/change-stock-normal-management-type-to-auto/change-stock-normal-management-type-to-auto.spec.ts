import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeStockNormalManagementTypeToAutoUsecase } from "./change-stock-normal-management-type-to-auto.usecase"
import { ChangeStockNormalManagementTypeToAutoUsecaseInterface } from "../../../domain/usecases"
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories"
import { StockNormalManagementEntity } from "../../../domain/entities"
import { StockNormalManagementTypeChangedToAutoEvent } from "./stock-normal-management-type-changed-to-auto.event"

jest.mock("./stock-normal-management-type-changed-to-auto.event")

describe("Test ChangeProductStockTypeToAutoUsecaseInterface", () => {


    let sut: ChangeStockNormalManagementTypeToAutoUsecase
    let props: ChangeStockNormalManagementTypeToAutoUsecaseInterface.InputDto
    let stockNormalManagementRepository: StockNormalManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockNormalManagementEntity: StockNormalManagementEntity

    beforeEach(() => {

        props = {
            stockNormalManagementId: "stock_normal_management_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        stockNormalManagementEntity = mock<StockNormalManagementEntity>()
        stockNormalManagementRepository = mock<StockNormalManagementRepositoryInterface>({
            findById: () => stockNormalManagementEntity
        } as any)

        sut = new ChangeStockNormalManagementTypeToAutoUsecase(stockNormalManagementRepository, eventEmitter)
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

    it("Should return StockManagementAlreadyIsAutoError if product stock is already auto", async () => {
        jest.spyOn(stockNormalManagementEntity, "isStockAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("StockManagementAlreadyIsAutoError")
    })

    it("Should call toStockAuto from stockNormalManagementEntity", async () => {
        await sut.execute(props)
        expect(stockNormalManagementEntity.toStockAuto).toBeCalledTimes(1)
    })

    it("Should call stockNormalManagementRepository.update once", async () => {
        await sut.execute(props)
        expect(stockNormalManagementRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create StockTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockNormalManagementTypeChangedToAutoEvent)
        .toBeCalledWith({ stockNormalManagementId: stockNormalManagementEntity.id })
    })

})