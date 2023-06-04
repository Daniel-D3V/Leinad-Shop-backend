import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories"
import {  CreateStockNormalManagementUsecaseInterface } from "../../../domain/usecases"
import { mock } from "jest-mock-extended"
import { CreateStockNormalManagementUsecase } from "./create-stock-normal-management.usecase"
import { StockNormalManagementCreatedEvent } from "./stock-normal-management-created.event"

jest.mock("./stock-normal-management-created.event")

describe("Test CreateStockManagementUsecase", () => {

    let sut: CreateStockNormalManagementUsecase
    let props: CreateStockNormalManagementUsecaseInterface.InputDto
    let stockNormalManagementRepository: StockNormalManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeEach(() => {
        props = {
           announceNormalId: "any_announce_normal_id"
        }
        stockNormalManagementRepository = mock<StockNormalManagementRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateStockNormalManagementUsecase(stockNormalManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockNormalManagementAlreadyExistsError if the stock management already exists", async () => {
        jest.spyOn(stockNormalManagementRepository, "findByAnnounceNormalId").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.value[0].name).toBe("StockNormalManagementAlreadyExistsError")
    })

    it("Should call stockManagementRepository.create once", async () => {
        await sut.execute(props)
        expect(stockNormalManagementRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit with the right params", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StockNormalManagementCreatedEvent constructor once", async () => {
        await sut.execute(props)
        expect(StockNormalManagementCreatedEvent).toHaveBeenCalledTimes(1)
    })

})