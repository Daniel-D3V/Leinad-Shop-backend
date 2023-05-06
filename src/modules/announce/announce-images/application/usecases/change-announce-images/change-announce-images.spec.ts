import { AnnounceImagesRepositoryInterface } from "@/modules/announce/announce-images/domain/repositories"
import { ChangeAnnounceImagesInputDto } from "./change-announce-images.dto"
import { ChangeAnnouceImagesUsecase } from "./change-announce-images.usecase"
import {  EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceImageEntity } from "@/modules/announce/announce-images/domain/entities"
import { AnnounceImagesChangedEvent } from "./announce-images-changed.event"

jest.mock("./announce-images-changed.event")

describe("Test ChangeAnnouceImagesUsecase", () => {

    let sut: ChangeAnnouceImagesUsecase
    let props: ChangeAnnounceImagesInputDto
    let announceImagesRepository: AnnounceImagesRepositoryInterface
    let eventEmitter: EventEmitterInterface
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
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnouceImagesUsecase(announceImagesRepository, eventEmitter)
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
    
    it("Should call announceImagesRepository.update once",  async () => {
        await sut.execute(props)
        expect(announceImagesRepository.update).toHaveBeenCalledTimes(1)
    })


    it("Should call eventEmitter once",  async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceImagesChangedEvent with correct values",  async () => {
        await sut.execute(props)
        expect(AnnounceImagesChangedEvent).toHaveBeenCalledWith(props)
    })
})