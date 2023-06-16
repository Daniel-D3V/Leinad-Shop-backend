import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { DeactivateAnnounceUsecaseInterface } from "../../../domain/usecases";
import { DeactivateAnnounceUsecase } from "./deactivate-announce.usecase";
import { AnnounceManagementEntity } from "../../../domain/entities";
import { mock } from "jest-mock-extended";
import { AnnounceDeactivatedEvent } from "./announce-deactivated.event";

jest.mock("./announce-deactivated.event")

describe("Test DeactivateAnnounce", () => {

    let sut: DeactivateAnnounceUsecase;
    let props: DeactivateAnnounceUsecaseInterface.InputDto
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
        sut = new DeactivateAnnounceUsecase(announceManagementRepository, eventEmitter)
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

    it("Should return AnnounceAlreadyDeactivatedError if the announce is already deactivated", async () => {
        jest.spyOn(announceManagementEntity, "isDeactivated").mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceAlreadyDeactivatedError")
    })

    it("Should call deactivate method of announceManagementEntity", async () => {
        await sut.execute(props)
        expect(announceManagementEntity.deactivate).toHaveBeenCalled()
    })

    it("Should call update method of announceManagementRepository", async () => {
        await sut.execute(props)
        expect(announceManagementRepository.update).toHaveBeenCalledWith(announceManagementEntity)
    })

    it("Should call emit method of eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalled()
    })

    it("Should create AnnounceDeactivatedEvent with correct props", async () => {
        await sut.execute(props)
        expect(AnnounceDeactivatedEvent).toHaveBeenCalledWith({
            announceId: announceManagementEntity.id
        })
    })
})