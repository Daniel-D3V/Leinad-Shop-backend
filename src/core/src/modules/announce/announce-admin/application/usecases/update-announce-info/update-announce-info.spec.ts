import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { UpdateAnnounceUsecase } from "./update-announce-info.usecase"
import { CommandEmitterInterface, EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { AnnounceInfoUpdatedEvent } from "./announce-info-updated.event"
import { UpdateAnnounceInfoUsecaseInterface } from "../../../domain/usecases"

jest.mock("./announce-info-updated.event")

describe("Test UpdateAnnounceUsecase", () => {
    let sut: UpdateAnnounceUsecase
    let props: UpdateAnnounceInfoUsecaseInterface.InputDto
    let announceRepository: AnnounceRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let eventEmitter: EventEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
            data: {}
        }
        announceEntity = mock<AnnounceEntity>()
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new UpdateAnnounceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if announceEntity is not found from the repository", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceInfoUpdatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceInfoUpdatedEvent).toHaveBeenCalledWith(props)
    })

    describe("change title", () => {

        it("Should call changeTitle if title is provided ", async () => {
            jest.spyOn(announceEntity, "changeTitle").mockReturnValueOnce({ isLeft: () => false } as any)
            props.data.title = "any_title"
            await sut.execute(props)
            expect(announceEntity.changeTitle).toHaveBeenCalledTimes(1)
        })

        it("Should return a error if the title to change is invalid ", async () => {
            const titleValidationError = new Error("titleValidationError")
            jest.spyOn(announceEntity, "changeTitle").mockReturnValueOnce({
                isLeft: () =>true,
                value: [ titleValidationError ]
            } as any)
            props.data.title = "any_title"
            const output = await sut.execute(props)
            expect(output.value![0]).toEqual(titleValidationError)
        })

    })

    describe("change description", () => {

        it("Should call changeDescription if description is provided ", async () => {
            jest.spyOn(announceEntity, "changeDescription").mockReturnValueOnce({ isLeft: () => false } as any)
            props.data.description = "any_description"
            await sut.execute(props)
            expect(announceEntity.changeDescription).toHaveBeenCalledTimes(1)
        })

        it("Should return a error if the description to change is invalid ", async () => {
            const descriptionValidationError = new Error("descriptionValidationError")
            jest.spyOn(announceEntity, "changeDescription").mockReturnValueOnce({
                isLeft: () =>true,
                value: [ descriptionValidationError ]
            } as any)
            props.data.description = "any_description"
            const output = await sut.execute(props)
            expect(output.value![0]).toEqual(descriptionValidationError)
        })
    })

})