import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories"
import { CreateAnnounceInfoUsecaseInterface } from "../../../domain/usecases"
import { CreateAnnounceInfoUsecase } from "./create-announce-info.usecase"
import { AnnounceInfoEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AnnounceInfoCreatedEvent } from "./announce-info-created.event"

jest.mock("./announce-info-created.event")

describe("Test CreateAnnounceInfoUseCase", () => {

    let sut: CreateAnnounceInfoUsecase
    let props: CreateAnnounceInfoUsecaseInterface.InputDto
    let announceInfoRepository: AnnounceInfoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceInfoEntity: AnnounceInfoEntity

    beforeEach(() => {
    
        announceInfoEntity = mock<AnnounceInfoEntity>()

        jest.spyOn(AnnounceInfoEntity, "create").mockReturnValue({
            isLeft: () => false, value: announceInfoEntity
        } as any)

        props = {
            announceId: "any_announce_id",
            description: "any_description",
            title: "any_title"
        }
        announceInfoRepository = mock<AnnounceInfoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateAnnounceInfoUsecase(announceInfoRepository, eventEmitter)
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return left if AnnounceInfoEntity.create return left", async () => {
        const entityError = [ new Error("any_error") ]
        jest.spyOn(AnnounceInfoEntity, "create").mockReturnValueOnce({
            isLeft: () => true, value: entityError
        } as any)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBe(true)
        expect(output.value).toEqual(entityError)
    })

    it("Should return AnnounceInfoAlreadyCreatedError if an entity with announceId already exists", async () => {
        jest.spyOn(announceInfoRepository, "findByAnnounceId").mockResolvedValueOnce(announceInfoEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBe(true)
        expect(output.value[0].name).toBe("AnnounceInfoAlreadyCreatedError")
    })

    it("Should call announceInfoRepository.create with correct params", async () => {
        await sut.execute(props)
        expect(announceInfoRepository.create).toBeCalledWith(announceInfoEntity)
        expect(announceInfoRepository.create).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create a AnnounceInfoCreatedEvent with correct params", async () => {
        await sut.execute(props)
        expect(AnnounceInfoCreatedEvent).toBeCalledWith({ ...announceInfoEntity.toJSON() })
    })

})