import { AnnounceImagesRepositoryInterface } from "@/modules/announce/announce-images/domain/repositories"
import { ChangeAnnounceImagesInputDto } from "./change-announce-images.dto"
import { ChangeAnnouceImagesUsecase } from "./change-announce-images.usecase"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceImageEntity } from "@/modules/announce/announce-images/domain/entities"
import { ChangeAnnounceImagesCommand } from "./change-announce-images.command"

jest.mock("./change-announce-images.command")

describe("Test ChangeAnnouceImagesUsecase", () => {

    let sut: ChangeAnnouceImagesUsecase
    let props: ChangeAnnounceImagesInputDto
    let announceImagesRepository: AnnounceImagesRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let announceImageEntity: AnnounceImageEntity

    beforeEach(() => {

        props = {
            announceId: "any_announce_id",
            images: []
        }
        announceImageEntity = mock<AnnounceImageEntity>({
            changeImages: () => ({ isLeft: () => false } ) as any
        })
        announceImagesRepository = mock<AnnounceImagesRepositoryInterface>()
        jest.spyOn(announceImagesRepository, "findById").mockResolvedValue(announceImageEntity)
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new ChangeAnnouceImagesUsecase(announceImagesRepository, commandEmitter)
    })

    it("Should execute the usecase properly",  async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if the repository doesn't find  AnnounceImageEntity ",  async () => {
        jest.spyOn(announceImagesRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })

    it("Should call changeImages function from announceImageEntity  ",  async () => {
        const announceImageEntitySpy = jest.spyOn(announceImageEntity, "changeImages")
        await sut.execute(props)
        expect(announceImageEntitySpy).toHaveBeenCalledTimes(1)
    })

    it("Should return an error if changeImages returns left ",  async () => {
        const changeImageError = new Error("ChangeImageError")
        jest.spyOn(announceImageEntity, "changeImages")
        .mockReturnValue({
            isLeft: () => true,
            value: [changeImageError]
        } as any)
        const output = await sut.execute(props)
        expect(output.value![0]).toEqual(changeImageError)
    })
    
    it("Should call commandEmitter once",  async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create ChangeAnnounceImagesCommand with correct values",  async () => {
        await sut.execute(props)
        expect(ChangeAnnounceImagesCommand).toHaveBeenCalledWith(props)
    })
})