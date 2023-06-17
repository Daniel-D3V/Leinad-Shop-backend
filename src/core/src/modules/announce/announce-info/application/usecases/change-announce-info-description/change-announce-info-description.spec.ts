import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories"
import { AnnounceInfoEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { ChangeAnnounceInfoDescriptionUsecase } from "./change-announce-info-description.usecase"
import { ChangeAnnounceInfoDescriptionUsecaseInterface } from "../../../domain/usecases"
import { AnnounceInfoDescriptionChangedEvent } from "./announce-info-description-changed.event"

jest.mock("./announce-info-description-changed.event")

describe("Test ChangeAnnounceInfoTitleUsecase", () => {

    let sut: ChangeAnnounceInfoDescriptionUsecase
    let props: ChangeAnnounceInfoDescriptionUsecaseInterface.InputDto
    let announceInfoRepository: AnnounceInfoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceInfoEntity: AnnounceInfoEntity

    
    beforeEach(() => {
        props = {
            announceInfoId: "any_announce_info_id",
            description: "any_description"
        }
        announceInfoEntity = mock<AnnounceInfoEntity>({
            changeDescription: () => ({ isLeft: () => false } as any)
        })
        announceInfoRepository = mock<AnnounceInfoRepositoryInterface>({
            findById: async () => announceInfoEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnounceInfoDescriptionUsecase(announceInfoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceInfoNotFoundError if announceInfo is not found", async () => {
        jest.spyOn(announceInfoRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("AnnounceInfoNotFoundError")
    })

    it("Should return an error if changeDescription fails", async () => {
        const changeDescriptionError = new Error("changeDescriptionError")
        jest.spyOn(announceInfoEntity, "changeDescription")
        .mockReturnValueOnce({ isLeft: () => true, value: [ changeDescriptionError ] } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ changeDescriptionError ])
    })

    it("Should call update method from repository", async () => {
        await sut.execute(props)
        expect(announceInfoRepository.update).toBeCalledWith(announceInfoEntity)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalled()
    })

    it("Should create AnnounceInfoDescriptionChangedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceInfoDescriptionChangedEvent).toBeCalledWith({
            announceInfoId: announceInfoEntity.id,
            description: announceInfoEntity.description
        })
    })
})