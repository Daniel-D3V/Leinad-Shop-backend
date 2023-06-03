import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockManagementRepositoryInterface } from "../../../domain/repositories"
import { InitializeStockManagementUsecaseInterface } from "../../../domain/usecases"
import { InitializeStockManagementUsecase } from "./initialize-stock-management.usecase"
import { mock } from "jest-mock-extended"
import { StockManagementInitializedEvent } from "./stock-management-initialized.event"

jest.mock("./stock-management-initialized.event")

describe("Test CreateStockManagementUsecase", () => {

    let sut: InitializeStockManagementUsecase
    let props: InitializeStockManagementUsecaseInterface.InputDto
    let stockManagementRepository: StockManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeEach(() => {
        props = {
            announceId: "announceId"
        }
        stockManagementRepository = mock<StockManagementRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new InitializeStockManagementUsecase(stockManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockManagementAlreadyExistsError if the stock management already exists", async () => {
        jest.spyOn(stockManagementRepository, "findByAnnounceId").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.value[0].name).toBe("StockManagementAlreadyExistsError")
    })

    it("Should call stockManagementRepository.create once", async () => {
        await sut.execute(props)
        expect(stockManagementRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit with the right params", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockManagementInitializedEvent constructor once", async () => {
        await sut.execute(props)
        expect(StockManagementInitializedEvent).toHaveBeenCalledTimes(1)
    })

})