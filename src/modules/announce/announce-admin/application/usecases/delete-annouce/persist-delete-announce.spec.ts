import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { DeleteAnnounceUsecase } from "./delete-announce.usecase"
import { DeleteAnnounceInputDto } from "./delete-announce.dto"


describe("test PersistDeleteAnnounce", () => {

    let sut: DeleteAnnounceUsecase
    let props: DeleteAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeAll(() => {
        props = {
            announceId: "any_announce_id",
        }
        announceRepository = mock<AnnounceRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteAnnounceUsecase(announceRepository, eventEmitter)
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