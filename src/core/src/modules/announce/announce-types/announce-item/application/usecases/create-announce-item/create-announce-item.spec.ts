import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories"
import { CreateAnnounceItemUsecaseInterface } from "../../../domain/usecases"
import { CreateAnnounceItemUsecase } from "./create-announce-item.usecase"
import { AnnounceItemEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnounceItemCreatedEvent } from "./announce-item-created.event"

jest.mock("./announce-item-created.event")

describe("Test CreateAnnounceItemUsecase", () => {

    let sut: CreateAnnounceItemUsecase
    let props: CreateAnnounceItemUsecaseInterface.InputDto
    let announceItemRepository: AnnounceItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceItemEntity: AnnounceItemEntity

    beforeEach(() => {

        props = {
            announceId: "any_announce_id",
            price: 100,
            title: "any_title"
        }
        announceItemEntity = mock<AnnounceItemEntity>()
        jest.spyOn(AnnounceItemEntity, "create").mockReturnValue({
            isLeft: () => false, value: announceItemEntity
        } as any)

        announceItemRepository = mock<AnnounceItemRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateAnnounceItemUsecase(announceItemRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return an error if AnnounceItemEntity.create returns error", async () => {
        const entityError = new Error("entityError")
        jest.spyOn(AnnounceItemEntity, "create").mockReturnValue({
            isLeft: () => true, value: entityError
        } as any)
        const output = await sut.execute(props)

        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual(entityError)
    })

    it("Should call announceItemRepository.create with correct params", async () => {
        await sut.execute(props)
        expect(announceItemRepository.create).toBeCalledWith(announceItemEntity)
        expect(announceItemRepository.create).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create an AnnounceItemCreatedEvent with correct params", async () => {
        await sut.execute(props)
        expect(AnnounceItemCreatedEvent).toBeCalledWith({ ...announceItemEntity.toJSON() })
    })
})