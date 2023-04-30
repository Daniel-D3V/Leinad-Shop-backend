import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { PersistDeleteAnnounceInputDto } from "./persist-delete-announce.dto"
import { PersistDeleteAnnounceUsecase } from "./persist-delete-announce.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"


describe("test PersistDeleteAnnounce", () => {

    let sut: PersistDeleteAnnounceUsecase
    let props: PersistDeleteAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeAll(() => {
        props = {
            announceId: "any_announce_id",
        }
        announceRepository = mock<AnnounceRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new PersistDeleteAnnounceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should call announceRepository.delete once", async () => {
        await sut.execute(props)
        expect(announceRepository.delete).toHaveBeenCalledTimes(1)
    })

    it("Should call announceRepository.delete with correct values", async () => {
        await sut.execute(props)
        expect(announceRepository.delete).toHaveBeenCalledWith(props.announceId)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })
})