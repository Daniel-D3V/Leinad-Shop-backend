import { mock } from "jest-mock-extended"
import { TwoFactorAuthenticationEntity } from "../../../domain/entities"
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories"
import { Verify2faCodeUsecaseInterface } from "../../../domain/usecases"
import { Temporary2faTokenFacadeInterface } from "../../../facades"
import { TwoFactorAuthenticationManagementInterface } from "../../protocols"
import { Verify2faCodeUsecase } from "./verify-2fa-code.usecase"


describe("Test Verify2faTokenUsecase", () => {

    let sut: Verify2faCodeUsecase
    let props: Verify2faCodeUsecaseInterface.InputDto
    let twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface
    let twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface
    let temporary2faTokenFacade: Temporary2faTokenFacadeInterface
    let twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity

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
        sut = new Verify2faCodeUsecase(
            twoFactorAuthenticationRepository,
            twoFactorAuthenticationManagement,
            temporary2faTokenFacade
        )
    })

    it("Should execute the usecae properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })
})