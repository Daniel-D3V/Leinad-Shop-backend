import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { ChangeAnnouncePriceUsecase } from "./change-announce-price.usecase"
import { AnnounceEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnouncePriceChangedEvent } from "./announce-price-changed.event"
import { ChangeAnnouncePriceUsecaseInterface } from "../../../domain/usecases"

jest.mock("./announce-price-changed.event")

describe("Test ChangeAnnouncePriceUsecase", () => {

    let sut: ChangeAnnouncePriceUsecase
    let props: ChangeAnnouncePriceUsecaseInterface.InputDto
    let announceRepository: AnnounceRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
            price: 10
        }
        announceEntity = mock<AnnounceEntity>({
            id: props.announceId,
            price: props.price
        })
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        eventEmitter = mock<EventEmitterInterface>()

        sut = new ChangeAnnouncePriceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if announceEntity could not be found on the repository", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })

    it("Should call changePrice from AnnounceEntity", async () => {
        await sut.execute(props)
        expect(announceEntity.changePrice).toHaveBeenCalledTimes(1)
        expect(announceEntity.changePrice).toHaveBeenCalledWith(props.price)
    })

    it("Should call announceRepository.update once", async () => {
        await sut.execute(props)
        expect(announceRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnouncePriceChangedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnouncePriceChangedEvent).toHaveBeenCalledWith({ ...props })
    })


})
