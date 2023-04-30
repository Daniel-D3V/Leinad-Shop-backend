import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { UpdateAnnounceInputDto } from "./update-announce.dto"
import { UpdateAnnounceUsecase } from "./update-announce.usecase"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"


describe("Test UpdateAnnounceUsecase", () => {
    let sut: UpdateAnnounceUsecase
    let props: UpdateAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
            data: {}
        }
        announceRepository = mock<AnnounceRepositoryInterface>()
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new UpdateAnnounceUsecase(announceRepository, commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })
})