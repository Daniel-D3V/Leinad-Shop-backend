import { EventEmitterInterface } from "@/modules/@shared/events"
import { VerificationCodeRepositoryInterface } from "../../../repositories"
import { GenerateVerificationCodeUsecaseInterface } from "../../../usecases/generate-verification-code.usecase.interface"
import { GenerateVerificationCodeUsecase } from "./generate-verification-code.usecase"
import { VerificationCodeEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { VerificationCodeGeneratedEvent } from "./verification-code-generated.event"

jest.mock("./verification-code-generated.event")

describe("Test Generate Verification Code Use Case", () => {

    let sut: GenerateVerificationCodeUsecase
    let props: GenerateVerificationCodeUsecaseInterface.InputDto
    let verificationCodeRepository: VerificationCodeRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let verificationCodeEntity: VerificationCodeEntity

    beforeEach(() => {

        props = {
            userId: "any_user_id"
        }
        verificationCodeEntity = mock<VerificationCodeEntity>()
        jest.spyOn(VerificationCodeEntity, "create")
        .mockReturnValue(verificationCodeEntity)
        verificationCodeRepository = mock<VerificationCodeRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new GenerateVerificationCodeUsecase(verificationCodeRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return VerificationCodeAlreadyGeneratedError if the verification code already exists", async () => {
        jest.spyOn(verificationCodeRepository, "findByUserId")
        .mockResolvedValue(true as any)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.value[0].name).toBe("VerificationCodeAlreadyGeneratedError")
    })

    it("Should call verificationCodeRepository.create once", async () => {
        await sut.execute(props)
        expect(verificationCodeRepository.create).toHaveBeenCalledWith(verificationCodeEntity)
        expect(verificationCodeRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create VerificationCodeGeneratedEvent with correct values", async () => {
        await sut.execute(props)
        expect(VerificationCodeGeneratedEvent).toHaveBeenCalledWith({
            ...verificationCodeEntity.toJSON()
        })
    })
})