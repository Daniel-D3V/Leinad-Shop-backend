import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories"
import { ChangeAnnounceTypeToItemUsecaseInterface } from "../../../domain/usecases"
import { ChangeAnnounceTypeToItemUsecase } from "./change-announce-type-to-item.usecase"
import { AnnounceManagementEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnounceTypeChangedToItemEvent } from "./announce-type-changed-to-item.event"

jest.mock("./announce-type-changed-to-item.event")

describe("Test ChangeAnnounceTypeToItemUsecase", () => {

    let sut: ChangeAnnounceTypeToItemUsecase
    let props: ChangeAnnounceTypeToItemUsecaseInterface.InputDto
    let announceManagementRepository: AnnounceManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceManagementEntity: AnnounceManagementEntity

    beforeEach(() => {

        props = {
            announceId: "any_announce_id"
        }
        announceManagementEntity = mock<AnnounceManagementEntity>()
        announceManagementRepository = mock<AnnounceManagementRepositoryInterface>({
            findById: async () => announceManagementEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAnnounceTypeToItemUsecase(announceManagementRepository, eventEmitter)
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceManagementNotFoundError if the announce is not found", async () => {
        jest.spyOn(announceManagementRepository, "findById").mockResolvedValueOnce(null)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceManagementNotFoundError")
    })

    it("Should return AnnounceTypeAlreadyIsItemError if the announce type is already item", async () => {
        jest.spyOn(announceManagementEntity, "isTypeItem").mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceTypeAlreadyIsItemError")
    })

    it("Should call changeTypeToItem method from announceManagementEntity", async () => {
        await sut.execute(props)
        expect(announceManagementEntity.changeTypeToItem).toHaveBeenCalled()
    })

    it("Should call update method from announceManagementRepository", async () => {
        await sut.execute(props)
        expect(announceManagementRepository.update).toHaveBeenCalledWith(announceManagementEntity)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalled()
    })

    it("Should create AnnounceTypeChangedToItemEvent", async () => {
        await sut.execute(props)
        expect(AnnounceTypeChangedToItemEvent).toHaveBeenCalledWith({
            announceId: announceManagementEntity.id
        })
    })

})