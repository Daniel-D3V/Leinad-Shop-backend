import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { CreateAnnounceUsecaseInterface } from "../../../domain/usecases";
import { CreateAnnounceUsecase } from "./create-announce.usecase";
import { mock } from "jest-mock-extended";
import { AnnounceManagementEntity } from "../../../domain/entities";
import { AnnounceCreatedEvent } from "./announce-created.event";

jest.mock("./announce-created.event")

describe("Test CreateAnnnounceUsecaes", () => {

    let sut: CreateAnnounceUsecase;
    let props: CreateAnnounceUsecaseInterface.InputDto;
    let announceManagementRepository: AnnounceManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceManagementEntity: AnnounceManagementEntity

    beforeEach(() => {

        props = {
            userId: "any_user_id"
        }
        announceManagementEntity = mock<AnnounceManagementEntity>()
        jest.spyOn(AnnounceManagementEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: announceManagementEntity } as any)
        announceManagementRepository = mock<AnnounceManagementRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateAnnounceUsecase(announceManagementRepository, eventEmitter)
    })  

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return left if the entity is left", async () => {
        const entityError = new Error("any_error")
        jest.spyOn(AnnounceManagementEntity, "create")
        .mockReturnValue({ isLeft: () => true, value: entityError } as any)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value).toEqual(entityError)
    })

    it("Should call the repository create method", async () => {
        await sut.execute(props)
        expect(announceManagementRepository.create).toBeCalledWith(announceManagementEntity)
        expect(announceManagementRepository.create).toBeCalledTimes(1)
    })

    it("Should call the eventEmitter emit method", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create AnnounceCreatedEvent with correct values", async() => {
        await sut.execute(props)
        expect(AnnounceCreatedEvent).toBeCalledWith({ ...announceManagementEntity.toJSON() })
    })

})