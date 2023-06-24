import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"

import { AnnounceNormalStockTypeChangedToManualEvent } from "./announce-normal-stock-type-changed-to-manual.event"
import { ChangeAnnounceNormalStockTypeToManualUsecaseInterface } from "../../../domain/usecases"
import { ChangeAnnounceNormalStockTypeToManualUsecase } from "./change-announce-normal-stock-type-to-manual.usecase"
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories"
import { AnnounceNormalEntity } from "../../../domain/entities"

jest.mock("./announce-normal-stock-type-changed-to-manual.event")

describe("Test ChangeStockTypeToNormalUsecase", () => {


    let sut: ChangeAnnounceNormalStockTypeToManualUsecase
    let props: ChangeAnnounceNormalStockTypeToManualUsecaseInterface.InputDto
    let announceNormalRepository: AnnounceNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceNormalEntity: AnnounceNormalEntity

    beforeEach(() => {

        props = {
            announceNormalId: "any_announce_normal_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        announceNormalEntity = mock<AnnounceNormalEntity>()
        announceNormalRepository = mock<AnnounceNormalRepositoryInterface>({
            findById: () => announceNormalEntity
        } as any)

        sut = new ChangeAnnounceNormalStockTypeToManualUsecase(announceNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceNormalNotFoundError if stock does not exists", async () => {
        jest.spyOn(announceNormalRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNormalNotFoundError")
    })

    it("Should return AnnounceNormalStockIsAlreadyIsManualError if product stock is already manual", async () => {
        jest.spyOn(announceNormalEntity, "isStockManual").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNormalStockIsAlreadyIsManualError")
    })

    it("Should call toStockManual from stockNormalManagementEntity", async () => {
        await sut.execute(props)
        expect(announceNormalEntity.toStockManual).toBeCalledTimes(1)
    })

    it("Should call stockNormalManagementRepository.update once", async () => {
        await sut.execute(props)
        expect(announceNormalRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create AnnounceNormalStockTypeChangedToManualEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceNormalStockTypeChangedToManualEvent)
        .toBeCalledWith({  announceNormalId: announceNormalEntity.id })
    })

})