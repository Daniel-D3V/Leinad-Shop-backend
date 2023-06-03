import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories"
import { CreateAnnounceItemUsecaseInterface } from "../../../domain/usecases"
import { CreateAnnounceItemUsecase } from "./create-announce-item.usecase"
import { AnnounceItemEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"


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
})