import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeAnnounceItemStockTypeToManualUsecase } from "./change-announce-normal-stock-type-to-manual.usecase"
import { ChangeAnnounceItemStockTypeToManualUsecaseInterface } from "../../../domain/usecases"
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories"
import { AnnounceItemEntity } from "../../../domain/entities"
import { AnnounceItemStockTypeChangedToManualEvent } from "./announce-normal-stock-type-changed-to-manual.event"

jest.mock("./announce-normal-stock-type-changed-to-manual.event")

describe("Test ChangeStockTypeToNormalUsecase", () => {


    let sut: ChangeAnnounceItemStockTypeToManualUsecase
    let props: ChangeAnnounceItemStockTypeToManualUsecaseInterface.InputDto
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

        sut = new ChangeAnnounceItemStockTypeToManualUsecase(announceItemRepository, eventEmitter)
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

    it("Should return AnnounceItemStockIsAlreadyIsManualError if product stock is already manual", async () => {
        jest.spyOn(announceItemEntity, "isStockManual").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceItemStockIsAlreadyIsManualError")
    })

    it("Should call toStockManual from announceItemEntity", async () => {
        await sut.execute(props)
        expect(announceItemEntity.toStockManual).toBeCalledTimes(1)
    })

    it("Should call announceItemRepository.update once", async () => {
        await sut.execute(props)
        expect(announceItemRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create AnnounceNormalStockTypeChangedToManualEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceItemStockTypeChangedToManualEvent)
        .toBeCalledWith({  announceItemId: announceItemEntity.id })
    })

})