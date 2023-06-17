import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories"
import { ChangeAnnounceInfoTitleUsecaseInterface } from "../../../domain/usecases"
import { ChangeAnnounceInfoTitleUsecase } from "./change-announce-info-title.usecase"
import { AnnounceInfoEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnounceInfoTitleChangedEvent } from "./announce-info-title-changed.event"

jest.mock("./announce-info-title-changed.event")

describe("Test ChangeAnnounceInfoTitleUsecase", () => {

    let sut: ChangeAnnounceInfoTitleUsecase
    let props: ChangeAnnounceInfoTitleUsecaseInterface.InputDto
    let announceInfoRepository: AnnounceInfoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceInfoEntity: AnnounceInfoEntity

    
    beforeEach(() => {
        props = {
            announceInfoId: "any_announce_info_id",
            title: "any_title"
        }
        announceInfoEntity = mock<AnnounceInfoEntity>({
            changeTitle: () => ({ isLeft: () => false } as any)
        })
        announceInfoRepository = mock<AnnounceInfoRepositoryInterface>({
            findById: async () => announceInfoEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnounceInfoTitleUsecase(announceInfoRepository, eventEmitter)
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

    it("Should return an error if changeTitle fails", async () => {
        const changeTitleError = new Error("changeTitleError")
        jest.spyOn(announceInfoEntity, "changeTitle")
        .mockReturnValueOnce({ isLeft: () => true, value: [ changeTitleError ] } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ changeTitleError ])
    })

    it("Should call update method from repository", async () => {
        await sut.execute(props)
        expect(announceInfoRepository.update).toBeCalledWith(announceInfoEntity)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalled()
    })

    it("Should create AnnounceInfoTitleChangedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceInfoTitleChangedEvent).toBeCalledWith({
            announceInfoId: announceInfoEntity.id,
            title: announceInfoEntity.title
        })
    })
})