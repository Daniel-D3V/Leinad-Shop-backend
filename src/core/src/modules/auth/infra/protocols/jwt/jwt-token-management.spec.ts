import { mock } from "jest-mock-extended"
import { RefreshTokenRepositoryInterface } from "../../../domain/repositories"
import { JwtTokenManagement } from "./jwt-token-management"
import { TokenPayloadModel } from "../../../application/models"
import { sign, verify, SignOptions } from "jsonwebtoken"
import { left } from "@/modules/@shared/logic"

jest.mock("jsonwebtoken")

describe("Test JwtTokenManagement", () => {

    let sut: JwtTokenManagement
    let refreshTokenRepository: RefreshTokenRepositoryInterface
    let tokenSecret: string
    let refreshTokenSecret: string
    let payload: TokenPayloadModel

    let mockSign: jest.MockedFunction<typeof sign>
    let mockVerify: jest.MockedFunction<typeof verify>

    let signConfig: SignOptions

    beforeEach(() => {
        payload = {
            email: "any_email",
            userId: "any_user_id"
        }
        signConfig = {
            expiresIn: "1h"
        }
        mockSign = sign as jest.MockedFunction<typeof sign>
        mockSign.mockReturnValue("any_token" as any)
        
        mockVerify = verify as jest.MockedFunction<typeof verify>
        mockVerify.mockReturnValue(payload as any)

        tokenSecret = "any_token_secret"
        refreshTokenSecret = "any_refresh_token_secret"
        refreshTokenRepository = mock<RefreshTokenRepositoryInterface>({
            findRefreshToken: () => "any_refresh_token" as any,
        })
        sut = new JwtTokenManagement(refreshTokenRepository, {
            refreshTokenSecret,
            tokenSecret
        })
    })

    it("Should generate a token", async () => {

        const token = await sut.generateToken(payload)
        expect(token).toBe("any_token")
        expect(mockSign).toHaveBeenCalledWith(payload, tokenSecret, expect.any(Object))
    })

    it("Should verify a token", async () => {
        const token = await sut.verifyToken("any_token")
        expect(token.isRight()).toBeTruthy()
    })

    it("Should return InvalidTokenErrorError if verify throws", async () => {
        mockVerify.mockImplementationOnce(() => { throw new Error()})
        const token = await sut.verifyToken("any_token")
        if(token.isRight()) throw new Error("Should not return right")
        expect(token.isLeft()).toBeTruthy()
        expect(token.value[0].name).toBe("InvalidTokenErrorError")
    })

    it("Should generate a refresh token", async () => {
        const refreshToken = await sut.generateRefreshToken(payload)
        expect(refreshToken).toBe("any_token")
        expect(mockSign).toHaveBeenCalledWith(payload, refreshTokenSecret, expect.any(Object))
        expect(refreshTokenRepository.storeRefreshToken).toHaveBeenCalledWith(refreshToken, payload.userId, expect.any(Date))
    })

    it("Should call refreshTokenRepository.storeRefreshToken once if a refresh token is generated", async () => {
        await sut.generateRefreshToken(payload)
        expect(refreshTokenRepository.storeRefreshToken).toHaveBeenCalledTimes(1)
    })

    it("Should verify a refresh token", async () => {
        const token = await sut.verifyRefreshToken("any_token")
        expect(token.isRight()).toBeTruthy()
    })

    it("Should return InvalidRefreshTokenErrorError if verify refreshToken throws", async () => {
        mockVerify.mockImplementationOnce(() => { throw new Error("")})
        const token = await sut.verifyRefreshToken("any_token")
        if(token.isRight()) throw new Error("Should not return right")
        expect(token.isLeft()).toBeTruthy()
        expect(token.value[0].name).toBe("InvalidRefreshTokenErrorError")
    })

    it("Should return InvalidRefreshTokenErrorError if refreshTokenRepository.findRefreshToken returns null", async () => {
        jest.spyOn(refreshTokenRepository, "findRefreshToken").mockResolvedValueOnce(null)
        const token = await sut.verifyRefreshToken("any_token")
        if(token.isRight()) throw new Error("Should not return right")
        expect(token.isLeft()).toBeTruthy()
        expect(token.value[0].name).toBe("InvalidRefreshTokenErrorError")
        expect(refreshTokenRepository.findRefreshToken).toHaveBeenCalledTimes(1)
    })

    describe("Test generateAccessTokenFromRefreshToken", () => {

        it("Should call verifyRefreshToken ", () => {
            const verifyRefreshTokenSpy = jest.spyOn(sut, "verifyRefreshToken")
            sut.generateAccessTokenFromRefreshToken("any_refresh_token")
            expect(verifyRefreshTokenSpy).toHaveBeenCalledWith("any_refresh_token")
        })

        it("Should return left if verifyRefreshToken returns left", async () => {
            jest.spyOn(sut, "verifyRefreshToken").mockResolvedValueOnce(left([ new Error() ]))
            const result = await sut.generateAccessTokenFromRefreshToken("any_refresh_token")
            expect(result.isLeft()).toBeTruthy()
        })

        it("Should call refreshTokenRepository.deleteRefreshToken once ", async () => {
            await sut.generateAccessTokenFromRefreshToken("any_refresh_token")
            expect(refreshTokenRepository.deleteRefreshToken).toHaveBeenCalledWith("any_refresh_token")
        })

        it("Should call generateToken and generateRefreshToken once with correct values ", async () => {
            const generateTokenSpy = jest.spyOn(sut, "generateToken")
            const generateRefreshTokenSpy = jest.spyOn(sut, "generateRefreshToken")
            
            await sut.generateAccessTokenFromRefreshToken("any_refresh_token")

            expect(generateTokenSpy).toHaveBeenCalledWith(payload)
            expect(generateRefreshTokenSpy).toHaveBeenCalledWith(payload)
        })


    })


})