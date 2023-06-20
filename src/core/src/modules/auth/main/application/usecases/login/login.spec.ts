import { LoginUsecaseInterface } from "@/modules/auth/main/domain/usecases"
import { LoginUsecase } from "./login.usecase"
import { UserRepositoryInterface } from "@/modules/auth/main/domain/repositories"
import { mock } from "jest-mock-extended"
import { UserEntity } from "@/modules/auth/main/domain/entities"
import { AuthTokenFacadeInterface } from "../../../facades"
import { Temporary2faTokenFacadeInterface, TwoFactorAuthenticationFacadeInterface } from "@/modules/auth/2fa/facades"

describe("Tets Login", () => {

    let sut: LoginUsecase
    let props: LoginUsecaseInterface.InputDto
    let userRepository: UserRepositoryInterface
    let authTokenFacade: AuthTokenFacadeInterface
    let twoFactorAuthenticationFacade: TwoFactorAuthenticationFacadeInterface
    let temporary2faTokenFacade: Temporary2faTokenFacadeInterface
    let userEntity: UserEntity

    beforeEach(() => {
        props = {
            email: "any_email@mail.com",
            password: "any_password"
        }

        userEntity = mock<UserEntity>({
            comparePassword: () => true,
            id: "any_id",
            email: "any_mail"
        })
        userRepository = mock<UserRepositoryInterface>({
            findByEmail: async () => userEntity
        })
        authTokenFacade = mock<AuthTokenFacadeInterface>({
            generateTokens: async () => ({ accessToken: "", refreshToken: "" })
        })
        twoFactorAuthenticationFacade = mock<TwoFactorAuthenticationFacadeInterface>()
        temporary2faTokenFacade = mock<Temporary2faTokenFacadeInterface>()

        sut = new LoginUsecase(
            userRepository, 
            authTokenFacade,
            twoFactorAuthenticationFacade,
            temporary2faTokenFacade
        )
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return InvalidCredentialsError if user not found", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("InvalidCredentialsError")
    })

    it("Should return InvalidCredentialsError if password does not match", async () => {
        const comparePasswordSpy = jest.spyOn(userEntity, "comparePassword")
        comparePasswordSpy.mockReturnValueOnce(false)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(comparePasswordSpy).toHaveBeenCalledTimes(1)
        expect(output.value[0].name).toBe("InvalidCredentialsError")
    })


})