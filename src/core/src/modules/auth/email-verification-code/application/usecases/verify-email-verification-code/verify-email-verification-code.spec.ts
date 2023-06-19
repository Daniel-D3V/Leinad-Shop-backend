import { EventEmitterInterface } from "@/modules/@shared/events"
import { VerificationCodeRepositoryInterface } from "../../../repositories"
import { VerifyEmailVerificationCodeUsecaseInterface } from "../../../usecases"
import { VerifyEmailVerificationCodeUsecase } from "./verify-email-verification-code.usecase"
import { VerificationCodeEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { EmailVerifiedEvent } from "./email-verified.event"

jest.mock("./email-verified.event")

describe("Test verify email verification code use case", () => {

    let sut: VerifyEmailVerificationCodeUsecase
    let props: VerifyEmailVerificationCodeUsecaseInterface.InputDto
    let verificationCodeRepository: VerificationCodeRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let verificationCodeEntity: VerificationCodeEntity

    beforeEach(() => {

        props = {
            code: "any_code"
        }
        verificationCodeEntity = mock<VerificationCodeEntity>()
        verificationCodeRepository = mock<VerificationCodeRepositoryInterface>({
            findByCode: jest.fn().mockResolvedValue(verificationCodeEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new VerifyEmailVerificationCodeUsecase(verificationCodeRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return VerificationCodeNotFoundError if verification code is not found", async () => {
        jest.spyOn(verificationCodeRepository, "findByCode").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Expected left, got right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("VerificationCodeNotFoundError")
    })

    it("Should return VerificationCodeExpiredError if verification code is expired", async () => {
        jest.spyOn(verificationCodeEntity, "isExpired").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Expected left, got right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("VerificationCodeExpiredError")
    })

    it("Should call delete method from verification code repository", async () => {
        await sut.execute(props)
        expect(verificationCodeRepository.deleteByCode).toHaveBeenCalledWith(props.code)
    })

    it("Should emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create EmailVerifiedEvent with correct values", async () => {
        await sut.execute(props)
        expect(EmailVerifiedEvent).toHaveBeenCalledWith({
            userId: verificationCodeEntity.userId
        })
    })
})