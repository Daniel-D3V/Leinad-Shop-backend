import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ChangeAnnounceNormalStockTypeToAutoUsecase } from "./change-announce-normal-stock-type-to-auto.usecase"
import { ChangeAnnounceNormalStockTypeToAutoUsecaseInterface } from "../../../domain/usecases"
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories"
import { AnnounceNormalEntity } from "../../../domain/entities"
import { AnnounceNormalStockTypeChangedToAutoEvent } from "./announce-normal-stock-type-changed-to-auto.event"

jest.mock("./announce-normal-stock-type-changed-to-auto.event")

describe("Test ChangeProductStockTypeToAutoUsecaseInterface", () => {


    let sut: ChangeAnnounceNormalStockTypeToAutoUsecase
    let props: ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.InputDto
    let announceNormalRepository: AnnounceNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceNormalEntity: AnnounceNormalEntity

    beforeEach(() => {

        props = {
            announceNormalId: "any_announce_normal_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        announceNormalEntity = mock<AnnounceNormalEntity>()
        announceNormalRepository = mock<AnnounceNormalRepositoryInterface>({
            findById: () => announceNormalEntity
        } as any)

        sut = new ChangeAnnounceNormalStockTypeToAutoUsecase(announceNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceNormalNotFoundError if stock does not exists", async () => {
        jest.spyOn(announceNormalRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNormalNotFoundError")
    })

    it("Should return AnnounceNormalStockIsAlreadyIsAutoError if product stock is already auto", async () => {
        jest.spyOn(announceNormalEntity, "isStockAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNormalStockIsAlreadyIsAutoError")
    })

    it("Should call toStockAuto from announceNormalEntity", async () => {
        await sut.execute(props)
        expect(announceNormalEntity.toStockAuto).toBeCalledTimes(1)
    })

    it("Should call announceNormalRepository.update once", async () => {
        await sut.execute(props)
        expect(announceNormalRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create AnnounceNormalStockTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceNormalStockTypeChangedToAutoEvent)
        .toBeCalledWith({ announceNormalId: announceNormalEntity.id })
    })

})