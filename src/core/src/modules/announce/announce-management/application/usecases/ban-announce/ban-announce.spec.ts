import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { AnnounceManagementEntity } from "../../../domain/entities";
import { mock } from "jest-mock-extended";
import { BanAnnounceUsecase } from "./ban-announce.usecase";
import { AnnounceBannedEvent } from "./announce-banned.event";
import { BanAnnounceUsecaseInterface } from "../../../domain/usecases";

jest.mock("./announce-banned.event")

describe("Test BanAnnounceUsecase", () => {

    let sut: BanAnnounceUsecase;
    let props: BanAnnounceUsecaseInterface.InputDto
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
        sut = new BanAnnounceUsecase(announceManagementRepository, eventEmitter)
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

    it("Should return AnnounceAlreadyBannedError if the announce is already deactivated", async () => {
        jest.spyOn(announceManagementEntity, "isBanned").mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceAlreadyBannedError")
    })

    it("Should call ban method of announceManagementEntity", async () => {
        await sut.execute(props)
        expect(announceManagementEntity.ban).toHaveBeenCalled()
    })

    it("Should call update method of announceManagementRepository", async () => {
        await sut.execute(props)
        expect(announceManagementRepository.update).toHaveBeenCalledWith(announceManagementEntity)
    })

    it("Should call emit method of eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalled()
    })

    it("Should create AnnounceBannedEvent with correct props", async () => {
        await sut.execute(props)
        expect(AnnounceBannedEvent).toHaveBeenCalledWith({
            announceId: announceManagementEntity.id
        })
    })
})