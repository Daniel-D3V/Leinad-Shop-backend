import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { DeleteAnnounceUsecase } from "./delete-announce.usecase"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { DeleteAnnounceInputDto } from "./delete-announce.dto"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { DeleteAnnounceCommand } from "./delete-announce.command"

jest.mock("./delete-announce.command")

describe("Test deleteAnnounceUsecase", () => {

    let sut: DeleteAnnounceUsecase
    let announceRepository: AnnounceRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let props: DeleteAnnounceInputDto
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
        }
        announceEntity = mock<AnnounceEntity>({ id: "any_announce_id" })
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new DeleteAnnounceUsecase(announceRepository, commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    // it("Should return AnnounceNotFoundError the announceEntity is not found by the repository", async () => {
    //     jest.spyOn(announceRepository, "findById").mockResolvedValueOnce(null)
    //     const output = await sut.execute(props)
    //     expect(output.value![0].name).toBe("AnnounceNotFoundError")
    // })

    it("Should call commandEmitter once", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create DeleteAnnounceCommand with correct values ", async () => {
        await sut.execute(props)
        expect(DeleteAnnounceCommand).toHaveBeenCalledWith({ ...props })
    })
})