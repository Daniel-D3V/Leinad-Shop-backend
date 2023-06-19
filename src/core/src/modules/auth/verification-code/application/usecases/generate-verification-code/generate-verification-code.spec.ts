import { EventEmitterInterface } from "@/modules/@shared/events"
import { VerificationCodeRepositoryInterface } from "../../../repositories"
import { GenerateVerificationCodeUsecaseInterface } from "../../../usecases/generate-verification-code.usecase.interface"
import { GenerateVerificationCodeUsecase } from "./generate-verification-code.usecase"
import { VerificationCodeEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"


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
        verificationCodeRepository = mock<VerificationCodeRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new GenerateVerificationCodeUsecase(verificationCodeRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })
    
})