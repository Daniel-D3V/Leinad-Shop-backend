import { LoginUsecaseInterface } from "@/modules/auth/domain/usecases"
import { LoginUsecase } from "./login.usecase"
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories"
import { TokenManagementInterface } from "../../protocols"
import { mock } from "jest-mock-extended"
import { UserEntity } from "@/modules/auth/domain/entities"


describe("Tets Login", () => {

    let sut: LoginUsecase
    let props: LoginUsecaseInterface.InputDto
    let userRepository: UserRepositoryInterface
    let tokenManagement: TokenManagementInterface
    let userEntity: UserEntity

    beforeEach(() => {
        props = {
            email: "any_email@mail.com",
            password: "any_password"
        }
        tokenManagement = mock<TokenManagementInterface>({
            generateToken: () => "any_token",
            generateRefreshToken: () => "any_refresh_token"  
        } as any)
        userRepository = mock<UserRepositoryInterface>()
        userEntity = mock<UserEntity>({
            comparePassword: () => true,
            id: "any_id",
            email: "any_mail"
        })
        jest.spyOn(userRepository, "findByEmail").mockResolvedValue(userEntity)
        sut = new LoginUsecase(userRepository, tokenManagement)
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

    it("Should call tokenManagement.generateToken with correct params", async () => {
        const generateTokenSpy = jest.spyOn(tokenManagement, "generateToken")
        await sut.execute(props)
        expect(generateTokenSpy).toHaveBeenCalledTimes(1)
        expect(generateTokenSpy).toHaveBeenCalledWith({
            email: userEntity.email,
            userId: userEntity.id
        })
    })

    it("Should call tokenManagement.generateRefreshToken with correct params", async () => {
        const generateRefreshTokenSpy = jest.spyOn(tokenManagement, "generateRefreshToken")
        await sut.execute(props)
        expect(generateRefreshTokenSpy).toHaveBeenCalledTimes(1)
        expect(generateRefreshTokenSpy).toHaveBeenCalledWith({
            email: userEntity.email,
            userId: userEntity.id
        })
    })
})