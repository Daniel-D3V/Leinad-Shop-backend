import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { UpdateAnnounceInputDto } from "./update-announce.dto"
import { UpdateAnnounceUsecase } from "./update-announce.usecase"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"


describe("Test UpdateAnnounceUsecase", () => {
    let sut: UpdateAnnounceUsecase
    let props: UpdateAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
            data: {}
        }
        announceEntity = mock<AnnounceEntity>()
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new UpdateAnnounceUsecase(announceRepository, commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if announceEntity is not found from the repository", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })
})