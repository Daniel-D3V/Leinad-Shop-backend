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
        tokenManagement = mock<TokenManagementInterface>()
        userRepository = mock<UserRepositoryInterface>()
        userEntity = mock<UserEntity>({
            comparePassword: () => true
        })
        jest.spyOn(userRepository, "findByEmail").mockResolvedValue(userEntity)
        sut = new LoginUsecase(userRepository, tokenManagement)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })
})