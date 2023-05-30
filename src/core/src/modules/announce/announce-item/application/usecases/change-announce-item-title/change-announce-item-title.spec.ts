
import { mock } from "jest-mock-extended";
import { AnnounceItemTitleChangedEvent } from "./announce-item-title-changed.event";
import { ChangeAnnounceItemTitleUsecase } from "./change-announce-item-title.usecase";
import { ChangeAnnounceItemTitleUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceItemEntity } from "../../../domain/entities";

jest.mock("./announce-item-title-changed.event")

describe("Test ChangeStockItemPrice", () => { 

    let sut: ChangeAnnounceItemTitleUsecase;
    let props: ChangeAnnounceItemTitleUsecaseInterface.InputDto
    let announceItemRepository: AnnounceItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceItemEntity: AnnounceItemEntity

    beforeEach(() => {

        props = {
            title: "any_title",
            announceItemId: "any_announce_item_id"
        }
        announceItemEntity = mock<AnnounceItemEntity>({
            id: props.announceItemId,
            title: props.title,
            changeTitle: () => ({
                isLeft: () => false,
            }) as any
        } )
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

    it("Should return AnnounceItemNotFoundError if stock item not found", async () => {
        jest.spyOn(announceItemRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceItemNotFoundError")
    })

    it("Should return error if announce item changeTitle fails", async () => {
        const error = new Error("any_error")
        jest.spyOn(announceItemEntity, "changeTitle").mockReturnValueOnce({
            isLeft: () => true,
            value: [ error ]
        } as any)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0]).toBe(error)
    })

    it("Should call announceItemRepository update method once" , async () => {
        await sut.execute(props)
        expect(announceItemRepository.update).toBeCalledWith(announceItemEntity)
        expect(announceItemRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter emit method once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create AnnounceItemTitleChangedEvent with correct values", async () => { 
        await sut.execute(props)
        expect(AnnounceItemTitleChangedEvent).toBeCalledWith({
            ...props
        })
    })
})
