import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories"
import {  ChangeAnnounceTypeToNormalUsecaseInterface } from "../../../domain/usecases"
import { AnnounceManagementEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { ChangeAnnounceTypeToNormalUsecase } from "./change-announce-type-to-normal.usecase"
import { AnnounceTypeChangedToNormalEvent } from "./announce-type-changed-to-normal.event"

jest.mock("./announce-type-changed-to-normal.event")

describe("Test ChangeAnnounceTypeToNormalUsecase", () => {

    let sut: ChangeAnnounceTypeToNormalUsecase
    let props: ChangeAnnounceTypeToNormalUsecaseInterface.InputDto
    let announceManagementRepository: AnnounceManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceManagementEntity: AnnounceManagementEntity

    beforeEach(() => {

        props = {
            announceId: "any_announce_id"
        }
        announceManagementEntity = mock<AnnounceManagementEntity>()
        announceManagementRepository = mock<AnnounceManagementRepositoryInterface>({
            findById: async () => announceManagementEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnounceTypeToNormalUsecase(announceManagementRepository, eventEmitter)
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceManagementNotFoundError if the announce is not found", async () => {
        jest.spyOn(announceManagementRepository, "findById").mockResolvedValueOnce(null)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceManagementNotFoundError")
    })

    it("Should return AnnounceTypeAlreadyIsNormalError if the announce type is already item", async () => {
        jest.spyOn(announceManagementEntity, "isTypeNormal").mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceTypeAlreadyIsNormalError")
    })

    it("Should call changeTypeToNormal method from announceManagementEntity", async () => {
        await sut.execute(props)
        expect(announceManagementEntity.changeTypeToNormal).toHaveBeenCalled()
    })

    it("Should call update method from announceManagementRepository", async () => {
        await sut.execute(props)
        expect(announceManagementRepository.update).toHaveBeenCalledWith(announceManagementEntity)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalled()
    })

    it("Should create AnnounceTypeChangedToNormalEvent", async () => {
        await sut.execute(props)
        expect(AnnounceTypeChangedToNormalEvent).toHaveBeenCalledWith({
            announceId: announceManagementEntity.id
        })
    })

})