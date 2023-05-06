import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { AnnounceActivatedEvent } from "./announce-activated.event"
import { ActivateAnnounceInputDto } from "./activate-announce.dto"
import { ActivateAnnounceUsecase } from "./activate-announce.usecase"

jest.mock("./announce-activated.event")

describe("Test ActivateAnnounceUsecase", () => {

    let sut: ActivateAnnounceUsecase
    let props: ActivateAnnounceInputDto
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

        sut = new ActivateAnnounceUsecase(announceRepository, eventEmitter)
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

    it("Should call activate method from AnnounceEntity", async () => {
        await sut.execute(props)
        expect(announceEntity.activate).toHaveBeenCalledTimes(1)
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
        expect(AnnounceActivatedEvent).toHaveBeenCalledWith({ ...props })
    })
})