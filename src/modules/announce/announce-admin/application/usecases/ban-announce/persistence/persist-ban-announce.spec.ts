import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { PersistBanAnnounceInputDto } from "./persist-ban-annouce.dto"
import { PersistBanAnnounceUsecase } from "./persist-ban-announce.usecase"
import { AnnounceBannedEvent } from "./announce-banned.event"

jest.mock("./announce-banned.event")

describe("Test PersistBanAnnounceUsecase", () => {

    let sut: PersistBanAnnounceUsecase
    let props: PersistBanAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
        }
        announceEntity = mock<AnnounceEntity>()
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        eventEmitter = mock<EventEmitterInterface>()

        sut = new PersistBanAnnounceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if announceEntity could not be found on the repository", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })

    it("Should call ban method from AnnounceEntity", async () => {
        await sut.execute(props)
        expect(announceEntity.ban).toHaveBeenCalledTimes(1)
    })

    it("Should call announceRepository.update once", async () => {
        await sut.execute(props)
        expect(announceRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceActivatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceBannedEvent).toHaveBeenCalledWith({ ...props })
    })
})