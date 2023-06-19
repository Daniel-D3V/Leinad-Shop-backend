import { GetUserByAccessTokenUsecaseInterface } from "@/modules/auth/domain/usecases"
import { GetUserByAccessTokenUsecase } from "./get-user-by-access-token.usecase"
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories"
import { TokenManagementInterface } from "../../protocols"
import { UserEntity } from "@/modules/auth/domain/entities"
import { mock } from "jest-mock-extended"

describe("Test GetUserByAccessTokenUsecase", () => {

    let sut: GetUserByAccessTokenUsecase
    let props: GetUserByAccessTokenUsecaseInterface.InputDto
    let userRepository: UserRepositoryInterface
    let tokenManagement: TokenManagementInterface
    let userEntity: UserEntity

    beforeEach(() => {
        props = {
            accessToken: "any_access_token"
        }
        userEntity = mock<UserEntity>({
            id: "any_id",
            email: "any_email"
        })
        tokenManagement = mock<TokenManagementInterface>({
            verifyToken: jest.fn().mockResolvedValue({ isLeft: () => false, value: { userId: "any_id" } })
        })
        userRepository = mock<UserRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(userEntity)
        })
        sut = new GetUserByAccessTokenUsecase(userRepository, tokenManagement)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output).toBeTruthy()
    })

    it("Should return an error if tokenManagement.verifyToken() returns an error", async () => {
        const tokenManagementError = new Error("any_error")
        jest.spyOn(tokenManagement, "verifyToken")
        .mockResolvedValueOnce({ isLeft: () => true, value: [tokenManagementError] } as any)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual([tokenManagementError])
    })

    it("Should return an error if userRepository.findById() returns null", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)

        if(output.isRight()) throw new Error("Should not return an output")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("UserNotFoundError")
    })

})