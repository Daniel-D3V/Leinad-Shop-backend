import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories"
import { ChangeAnnounceItemTitleUsecaseInterface } from "../../../domain/usecases"
import { ChangeAnnounceItemTitleUsecase } from "./change-announce-item-title.usecase"
import { AnnounceItemEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnounceItemTitleChangedEvent } from "./announce-item-title-changed.event"

jest.mock("./announce-item-title-changed.event")

describe("Test ChangeAnnounceItemTitleUsecase", () => {

    let sut: ChangeAnnounceItemTitleUsecase
    let props: ChangeAnnounceItemTitleUsecaseInterface.InputDto
    let announceItemRepository: AnnounceItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceItemEntity: AnnounceItemEntity

    beforeEach(() => {
        props = {
            announceItemId: "any_announce_item_id",
            title: "any_title"
        }
        announceItemEntity = mock<AnnounceItemEntity>({
            changeTitle: () => ({ isLeft: () => false } as any)
        })
        announceItemRepository = mock<AnnounceItemRepositoryInterface>({
            findById: async () => announceItemEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnounceItemTitleUsecase(announceItemRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceItemNotFoundError if the announce item does not exist", async () => {
        jest.spyOn(announceItemRepository, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceItemNotFoundError")
    })

    it("Should return an error if announceItemEntity.changeTitle fails", async () => {
        const changeTitleError = new Error("any_error")
        jest.spyOn(announceItemEntity, "changeTitle")
        .mockReturnValueOnce({ isLeft: () => true, value: [ changeTitleError ] } as any)
        const output = await  sut.execute(props)
        expect(output.value).toEqual([ changeTitleError ])
    })

    it("Should call announceItemRepository.update with the correct params", async () => {
        await sut.execute(props)
        expect(announceItemRepository.update).toHaveBeenCalledWith(announceItemEntity)
        expect(announceItemRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceItemTitleChangedEvent with correct params", async () => {
        await sut.execute(props)
        expect(AnnounceItemTitleChangedEvent).toBeCalledWith({
            announceItemId: announceItemEntity.id,
            title: announceItemEntity.title
        })
    })

})