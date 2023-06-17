import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories"
import { ChangeAnnounceItemPriceUsecaseInterface } from "../../../domain/usecases"
import { ChangeAnnounceItemPriceUsecase } from "./change-announce-item-price.usecase"
import { AnnounceItemEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnounceItemPriceChangedEvent } from "./announce-item-price-changed.event"

jest.mock("./announce-item-price-changed.event")

describe("Test ChangeAnnounceItemPriceUsecase", () => {

    let sut: ChangeAnnounceItemPriceUsecase
    let props: ChangeAnnounceItemPriceUsecaseInterface.InputDto
    let announceItemRepository: AnnounceItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceItemEntity: AnnounceItemEntity

    beforeEach(() => {
        props = {
            announceItemId: "any_announce_item_id",
            price: 10
        }
        announceItemEntity = mock<AnnounceItemEntity>({
            changePrice: () => ({ isLeft: () => false } as any)
        })
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

    it("Should return AnnounceItemNotFoundError if the announce item does not exist", async () => {
        jest.spyOn(announceItemRepository, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceItemNotFoundError")
    })

    it("Should return an error if announceItemEntity.changePrice fails", async () => {
        const changePriceError = new Error("any_error")
        jest.spyOn(announceItemEntity, "changePrice")
        .mockReturnValueOnce({ isLeft: () => true, value: [ changePriceError ] } as any)
        const output = await  sut.execute(props)
        expect(output.value).toEqual([ changePriceError ])
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

    it("Should create AnnounceItemPriceChangedEvent with correct params", async () => {
        await sut.execute(props)
        expect(AnnounceItemPriceChangedEvent).toBeCalledWith({
            announceItemId: announceItemEntity.id,
            price: announceItemEntity.getPrice()
        })
    })

})