import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories"
import { ChangeAnnounceNormalPriceUsecase } from "./change-announce-normal-price.usecase"
import { AnnounceNormalEntity } from "../../../domain/entities"
import { ChangeAnnounceNormalPriceUsecaseInterface } from "../../../domain/usecases"
import { mock } from "jest-mock-extended"
import { AnnounceNormalPriceChangedEvent } from "./announce-normal-price-changed.event"

jest.mock("./announce-normal-price-changed.event")

describe('Test ChangeAnnounceNormalPriceUsecase', () => { 

    let sut: ChangeAnnounceNormalPriceUsecase
    let props: ChangeAnnounceNormalPriceUsecaseInterface.InputDto
    let announceNormalRepository: AnnounceNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceNormalEntity: AnnounceNormalEntity

    beforeEach(() => {

        props = {
            announceNormalId: "announce_normal_id",
            price: 100
        }
        announceNormalEntity = mock<AnnounceNormalEntity>({
            changePrice: () => ({ isLeft: () => false } as any)
        })
        announceNormalRepository = mock<AnnounceNormalRepositoryInterface>({
            findById: async () => announceNormalEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnounceNormalPriceUsecase(announceNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceNormalNotFoundError if announce normal not found", async () => {
        jest.spyOn(announceNormalRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNormalNotFoundError")
    })

    it("Should return an error if change price fails", async () => {
        const changePriceError = new Error("ChangePriceError")
        jest.spyOn(announceNormalEntity, "changePrice")
        .mockReturnValueOnce({ isLeft: () => true, value: [ changePriceError ] } as any)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual([ changePriceError ])
    })

    it("Should call update method from repository", async () => {
        await sut.execute(props)
        expect(announceNormalRepository.update).toBeCalledWith(announceNormalEntity)
        expect(announceNormalRepository.update).toBeCalledTimes(1)
    })

    it("Should emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create  AnnounceNormalPriceChangedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceNormalPriceChangedEvent).toHaveBeenCalledWith({
            announceNormalId: announceNormalEntity.id,
            price: announceNormalEntity.getPrice()
        })
    })
})