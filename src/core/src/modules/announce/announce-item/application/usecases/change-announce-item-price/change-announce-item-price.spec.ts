import { EventEmitterInterface } from "@/modules/@shared/events";
import { mock } from "jest-mock-extended";
import { ChangeAnnounceItemPriceUsecase } from "./change-announce-item-price.usecase";
import { ChangeAnnounceItemPriceUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { AnnounceItemEntity } from "../../../domain/entities";
import { AnnounceItemPriceChangedEvent } from "./announce-item-price-changed.event";

jest.mock("./announce-item-price-changed.event")

describe("Test ChangeStockItemPrice", () => { 

    let sut: ChangeAnnounceItemPriceUsecase;
    let props: ChangeAnnounceItemPriceUsecaseInterface.InputDto
    let announceItemRepository: AnnounceItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceItemEntity: AnnounceItemEntity

    beforeEach(() => {

        props = {
            price: 10,
            announceItemId: "any_announce_item_id"
        }
        announceItemEntity = mock<AnnounceItemEntity>({
            id: props.announceItemId,
            price: props.price,
            changePrice: () => ({
                isLeft: () => false,
            }) as any
        } )
        announceItemRepository = mock<AnnounceItemRepositoryInterface>({
            findById: async () => announceItemEntity
        })
        eventEmitter = mock<EventEmitterInterface>()

        sut = new ChangeAnnounceItemPriceUsecase(announceItemRepository, eventEmitter)
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

    it("Should return error if stock item change price fails", async () => {
        const error = new Error("any_error")
        jest.spyOn(announceItemEntity, "changePrice").mockReturnValueOnce({
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

    it("Should create AnnounceItemPriceChangedEvent with correct values", async () => { 
        await sut.execute(props)
        expect(AnnounceItemPriceChangedEvent).toBeCalledWith({
            ...props
        })
    })
})
