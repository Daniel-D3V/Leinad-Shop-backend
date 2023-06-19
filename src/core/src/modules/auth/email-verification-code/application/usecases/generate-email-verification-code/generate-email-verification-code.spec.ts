import { EventEmitterInterface } from "@/modules/@shared/events"
import { VerificationCodeRepositoryInterface } from "../../../domain/repositories"
import { GenerateEmailVerificationCodeUsecaseInterface } from "../../../domain/usecases"
import { GenerateEmailVerificationCodeUsecase } from "./generate-email-verification-code.usecase"
import { VerificationCodeEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { EmailVerificationCodeGeneratedEvent } from "./email-verification-code-generated.event"

jest.mock("./email-verification-code-generated.event")

describe("Test Generate Verification Code Use Case", () => {

    let sut: GenerateEmailVerificationCodeUsecase
    let props: GenerateEmailVerificationCodeUsecaseInterface.InputDto
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
        sut = new GenerateEmailVerificationCodeUsecase(verificationCodeRepository, eventEmitter)
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

    it("Should create EmailVerificationCodeGeneratedEvent with correct values", async () => {
        await sut.execute(props)
        expect(EmailVerificationCodeGeneratedEvent).toHaveBeenCalledWith({
            ...verificationCodeEntity.toJSON()
        })
    })
})