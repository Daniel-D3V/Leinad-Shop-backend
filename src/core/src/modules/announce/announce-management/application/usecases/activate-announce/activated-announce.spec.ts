import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { AnnounceManagementEntity } from "../../../domain/entities";
import { mock } from "jest-mock-extended";
import { AnnounceActivatedEvent } from "./announce-activated.event";
import { ActivateAnnounceUsecase } from "./activate-announce.usecase";
import { ActivateAnnounceUsecaseInterface } from "../../../domain/usecases";

jest.mock("./announce-activated.event")

describe("Test ActivateAnnounceUsecase", () => {

    let sut: ActivateAnnounceUsecase;
    let props: ActivateAnnounceUsecaseInterface.InputDto
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
        sut = new ActivateAnnounceUsecase(announceManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
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

    it("Should return AnnounceAlreadyActivatedError if the announce is already deactivated", async () => {
        jest.spyOn(announceManagementEntity, "isActivated").mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceAlreadyActivatedError")
    })

    it("Should call activate method of announceManagementEntity", async () => {
        await sut.execute(props)
        expect(announceManagementEntity.activate).toHaveBeenCalled()
    })

    it("Should call update method of announceManagementRepository", async () => {
        await sut.execute(props)
        expect(announceManagementRepository.update).toHaveBeenCalledWith(announceManagementEntity)
    })

    it("Should call emit method of eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalled()
    })

    it("Should create AnnounceActivatedEvent with correct props", async () => {
        await sut.execute(props)
        expect(AnnounceActivatedEvent).toHaveBeenCalledWith({
            announceId: announceManagementEntity.id
        })
    })
})