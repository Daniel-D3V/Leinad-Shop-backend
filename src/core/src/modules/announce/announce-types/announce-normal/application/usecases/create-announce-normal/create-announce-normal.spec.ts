import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceNormalEntity } from "../../../domain/entities"
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories"
import { CreateAnnounceNormalUsecaseInterface } from "../../../domain/usecases"
import { CreateAnnounceNormalUsecase } from "./create-announce-normal.usecase"
import { mock } from "jest-mock-extended"
import { AnnounceNormalCreatedEvent } from "./announce-normal-created.event"

jest.mock("./announce-normal-created.event")

describe("Test CreateAnnounceNormal", () => {

    let sut: CreateAnnounceNormalUsecase
    let props: CreateAnnounceNormalUsecaseInterface.InputDto
    let announceNormalRepository: AnnounceNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceNormalEntity: AnnounceNormalEntity

    beforeEach(() => {

        props = {
            announceId: "any_announce_id",
            price: 100
        }
        announceNormalEntity = mock<AnnounceNormalEntity>()
        jest.spyOn(AnnounceNormalEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: announceNormalEntity } as any)
        eventEmitter = mock<EventEmitterInterface>()
        announceNormalRepository = mock<AnnounceNormalRepositoryInterface>()
        sut = new CreateAnnounceNormalUsecase(announceNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return an error if AnnounceNormalEntity.create returns an error", async () => {
        const error = new Error("entity_error")
        jest.spyOn(AnnounceNormalEntity, "create")
        .mockReturnValue({ isLeft: () => true, value: error } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual(error)
    })

    it("Should return AnnounceNormalAlreadyCreatedError if an announce normal already exists", async () => {
        jest.spyOn(announceNormalRepository, "findByAnnounceId")
        .mockResolvedValueOnce(announceNormalEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("AnnounceNormalAlreadyCreatedError")
    })

    it("Should call announceNormalRepository.create with the right params", async () => {
        await sut.execute(props)
        expect(announceNormalRepository.create).toHaveBeenCalledWith(announceNormalEntity)
        expect(announceNormalRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once ", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create an AnnounceNormalCreatedEvent with the right params", async () => {
        await sut.execute(props)
        expect(AnnounceNormalCreatedEvent).toHaveBeenCalledWith({ ...announceNormalEntity.toJSON() })
    })
})