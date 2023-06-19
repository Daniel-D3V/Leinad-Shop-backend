import { mock } from "jest-mock-extended"
import { VerificationCodeRepositoryInterface } from "../../../domain/repositories"
import { GenerateEmailVerificationCodeUsecaseInterface, RegenerateEmailVerificationCodeUsecaseInterface } from "../../../domain/usecases"
import { RegenerateEmailVerificationCodeUsecase } from "./regenerate-email-verification-code.usecase"
import { VerificationCodeEntity } from "../../../domain/entities"


describe("Test RegenerateEmailVerificationCodeUseCase", () => {

    let sut: RegenerateEmailVerificationCodeUsecase
    let props: RegenerateEmailVerificationCodeUsecaseInterface.InputDto
    let verificationCodeRepository: VerificationCodeRepositoryInterface
    let generateEmailVerificationCodeUsecase: GenerateEmailVerificationCodeUsecaseInterface
    let verificationCodeEntity: VerificationCodeEntity

    beforeEach(() => {

        props = {
            userId: "any_user_id"
        }
        verificationCodeEntity = mock<VerificationCodeEntity>()
        verificationCodeRepository = mock<VerificationCodeRepositoryInterface>({
            findByUserId: jest.fn().mockResolvedValue(verificationCodeEntity),
        })
        generateEmailVerificationCodeUsecase = mock<GenerateEmailVerificationCodeUsecaseInterface>({
            execute: async () => ({
                isLeft: () => false,
                value: { id: "any_id" }
            } as any)
        })
        sut = new RegenerateEmailVerificationCodeUsecase(verificationCodeRepository, generateEmailVerificationCodeUsecase)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return VerificationCodeNotFoundError if verificationCodeRepository.findByUserId returns null", async () => {
        jest.spyOn(verificationCodeRepository, "findByUserId")
        .mockResolvedValueOnce(null)
        
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("VerificationCodeNotFoundError")
    })

    it("Should call verificationCodeRepository.deleteByCode with correct params", async () => {
        const deleteByCodeSpy = jest.spyOn(verificationCodeRepository, "deleteByCode")
        await sut.execute(props)
        expect(deleteByCodeSpy).toHaveBeenCalledWith(verificationCodeEntity.code)
    })

    it("Should call generateEmailVerificationCodeUsecase.execute with correct params", async () => {
        const executeSpy = jest.spyOn(generateEmailVerificationCodeUsecase, "execute")
        await sut.execute(props)
        expect(executeSpy).toHaveBeenCalledWith({ userId: props.userId })
    })
})