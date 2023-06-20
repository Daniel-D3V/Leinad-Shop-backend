import { mock } from "jest-mock-extended"
import { TwoFactorAuthenticationEntity } from "../../../domain/entities"
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories"
import { Verify2faCodeUsecaseInterface } from "../../../domain/usecases"
import { Temporary2faTokenFacadeInterface } from "../../../facades"
import { TwoFactorAuthenticationManagementInterface } from "../../protocols"
import { Verify2faCodeUsecase } from "./verify-2fa-code.usecase"
import { AuthTokenFacadeInterface } from "@/modules/auth/main/facades"


describe("Test Verify2faTokenUsecase", () => {

    let sut: Verify2faCodeUsecase
    let props: Verify2faCodeUsecaseInterface.InputDto
    let twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface
    let twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface
    let temporary2faTokenFacade: Temporary2faTokenFacadeInterface
    let twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity
    let authTokenFacade: AuthTokenFacadeInterface

    beforeEach(() => {
        props = {
            code: "123456",
            temporaryToken: "any_temporary_token"
        }
        twoFactorAuthenticationEntity = mock<TwoFactorAuthenticationEntity>({
            isValid: () => true
        })
        twoFactorAuthenticationRepository = mock<TwoFactorAuthenticationRepositoryInterface>({
            findByUserId: async () => twoFactorAuthenticationEntity
        })
        twoFactorAuthenticationManagement = mock<TwoFactorAuthenticationManagementInterface>({
            verify2fa: async () => true
        })
        temporary2faTokenFacade = mock<Temporary2faTokenFacadeInterface>({
            find: async () => ({
                userId: "any_user_id"
            })
        })
        authTokenFacade = mock<AuthTokenFacadeInterface>()
        sut = new Verify2faCodeUsecase(
            twoFactorAuthenticationRepository,
            twoFactorAuthenticationManagement,
            temporary2faTokenFacade,
            authTokenFacade
        )
    })

    it("Should execute the usecae properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return TemporaryTokenNotFoundError if temporary token is not found", async () => {
        jest.spyOn(temporary2faTokenFacade, "find")
        .mockResolvedValueOnce(null)
        
        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("TemporaryTokenNotFoundError")
    })

    it("Should return TwoFactorNotFoundError if 2faEntity is not found", async () => {
        jest.spyOn(twoFactorAuthenticationRepository, "findByUserId")
        .mockResolvedValueOnce(null)
        
        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("TwoFactorNotFoundError")
    })

    it("Should return TwoFactorIsNotValidError if 2faEntity is not valid", async () => {
        jest.spyOn(twoFactorAuthenticationEntity, "isValid")
        .mockReturnValueOnce(false)
        
        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("TwoFactorIsNotValidError")
    })

    it("Should return Invalid2faCodeError if 2fa code provided is invalid", async () => {
        jest.spyOn(twoFactorAuthenticationManagement, "verify2fa")
        .mockResolvedValueOnce(false)
        
        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("Invalid2faCodeError")
    })

    it("Should call temporary2faTokenFacade.delete once", async () => {
        await sut.execute(props)
        expect(temporary2faTokenFacade.delete).toHaveBeenCalledTimes(1)
    })
})