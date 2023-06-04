import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockManagementRepositoryInterface } from "../../../domain/repositories"
import {  InitializeStockNormalManagementUsecaseInterface } from "../../../domain/usecases"
import { mock } from "jest-mock-extended"
import { InitializeStockNormalManagementUsecase } from "./initialize-stock-normal-management.usecase"
import { StockNormalManagementInitializedEvent } from "./stock-normal-management-initialized.event"

jest.mock("./stock-normal-management-initialized.event")

describe("Test CreateStockManagementUsecase", () => {

    let sut: InitializeStockNormalManagementUsecase
    let props: InitializeStockNormalManagementUsecaseInterface.InputDto
    let stockManagementRepository: StockManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeEach(() => {
        props = {
           announceNormalId: "any_announce_normal_id"
        }
        stockManagementRepository = mock<StockManagementRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new InitializeStockNormalManagementUsecase(stockManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockNormalManagementAlreadyExistsError if the stock management already exists", async () => {
        jest.spyOn(stockManagementRepository, "findByAnnounceNormalId").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.value[0].name).toBe("StockNormalManagementAlreadyExistsError")
    })

    it("Should call stockManagementRepository.create once", async () => {
        await sut.execute(props)
        expect(stockManagementRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit with the right params", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockNormalManagementInitializedEvent constructor once", async () => {
        await sut.execute(props)
        expect(StockNormalManagementInitializedEvent).toHaveBeenCalledTimes(1)
    })

})