import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeAnnounceItemStockTypeToAutoUsecase } from "./change-announce-item-stock-type-to-auto.usecase"
import { ChangeAnnounceItemStockTypeToAutoUsecaseInterface } from "../../../domain/usecases"
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories"
import { AnnounceItemEntity } from "../../../domain/entities"
import { AnnounceItemStockTypeChangedToAutoEvent } from "./announce-item-stock-type-changed-to-auto.event"


jest.mock("./announce-item-stock-type-changed-to-auto.event")

describe("Test ChangeAnnounceItemStockTypeToAutoUsecase", () => {


    let sut: ChangeAnnounceItemStockTypeToAutoUsecase
    let props: ChangeAnnounceItemStockTypeToAutoUsecaseInterface.InputDto
    let announceItemRepository: AnnounceItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceItemEntity: AnnounceItemEntity

    beforeEach(() => {

        props = {
            announceItemId: "any_announce_item_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        announceItemEntity = mock<AnnounceItemEntity>()
        announceItemRepository = mock<AnnounceItemRepositoryInterface>({
            findById: () => announceItemEntity
        } as any)

        sut = new ChangeAnnounceItemStockTypeToAutoUsecase(announceItemRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceItemNotFoundError if stock does not exists", async () => {
        jest.spyOn(announceItemRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceItemNotFoundError")
    })

    it("Should return AnnounceItemStockIsAlreadyIsAutoError if product stock is already auto", async () => {
        jest.spyOn(announceItemEntity, "isStockAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceItemStockIsAlreadyIsAutoError")
    })

    it("Should call toStockAuto from announceItemEntity", async () => {
        await sut.execute(props)
        expect(announceItemEntity.toStockAuto).toBeCalledTimes(1)
    })

    it("Should call announceNormalRepository.update once", async () => {
        await sut.execute(props)
        expect(announceItemRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create AnnounceItemStockTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceItemStockTypeChangedToAutoEvent)
        .toBeCalledWith({ announceItemId: announceItemEntity.id })
    })

})