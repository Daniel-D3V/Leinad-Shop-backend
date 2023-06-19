import { RefreshTokenUsecaseInterface } from "@/modules/auth/main/domain/usecases"
import { TokenManagementInterface } from "../../protocols"
import { RefreshTokenUsecase } from "./refresh-token.usecase"
import { mock } from "jest-mock-extended"

describe("Test RefreshTokenUseCase", () => {

    let sut: RefreshTokenUsecaseInterface
    let props: RefreshTokenUsecaseInterface.InputDto
    let tokenManagement: TokenManagementInterface

    beforeEach(() => {

        props = {
            refreshToken: "any_refresh_token"
        }
        tokenManagement = mock<TokenManagementInterface>({
            generateAccessTokenFromRefreshToken: () => ({ isLeft: () => false })
        } as any)
        sut = new RefreshTokenUsecase(tokenManagement)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return an error if tokenManagement returns left", async () => {
        const error = new Error("any_error")
        jest.spyOn(tokenManagement, "generateAccessTokenFromRefreshToken")
        .mockReturnValueOnce({ isLeft: () => true, value: [error] } as any)
        
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value).toEqual([ error ])
    })
})