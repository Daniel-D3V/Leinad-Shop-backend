import { Either, left, right } from "@/modules/@shared/logic";
import { TokenPayloadModel } from "../../../application/models";
import { TokenManagementInterface } from "../../../application/protocols";
import { sign, verify } from "jsonwebtoken"
import { RefreshTokenRepositoryInterface } from "../../../domain/repositories";
import { InvalidRefreshTokenErrorError, InvalidTokenErrorError } from "./errors";

export class JwtTokenManagement implements TokenManagementInterface {

    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepositoryInterface,
        private readonly config: JwtTokenManagement.Config
    ){}

    async generateToken(payload: TokenPayloadModel): Promise<string> {
        const token = sign(payload, this.config.tokenSecret, {
            expiresIn: "1h"
        })
        return token
    }
    async verifyToken(token: string): Promise<Either<Error[], TokenPayloadModel>> {
        try {
            const payload = verify(token, this.config.tokenSecret) as TokenPayloadModel
            return right(payload)
        } catch (error) {
            return left([ new InvalidTokenErrorError() ])
        }
    }
    async generateRefreshToken(payload: TokenPayloadModel): Promise<string> {
        const refreshToken = sign(payload, this.config.refreshTokenSecret, {
            expiresIn: "14d"
        })
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 14);
        await this.refreshTokenRepository.storeRefreshToken(refreshToken, expirationDate)
        return refreshToken
    }
    async verifyRefreshToken(token: string): Promise<Either<Error[], TokenPayloadModel>> {
        try {
            const payload = verify(token, this.config.refreshTokenSecret) as TokenPayloadModel

            const refreshToken = await this.refreshTokenRepository.findRefreshToken(token)
            if(!refreshToken) throw new InvalidRefreshTokenErrorError()

            return right(payload)
        } catch (error) {
            return left([ new InvalidRefreshTokenErrorError() ])
        }
    }
    async generateAccessTokenFromRefreshToken(refreshToken: string): Promise<Either<Error[], TokenManagementInterface.AccessAndRefreshToken>> {
        
        const verifyTokenResult = await this.verifyRefreshToken(refreshToken)
        if(verifyTokenResult.isLeft()) return left(verifyTokenResult.value)

        const payload: TokenPayloadModel = verifyTokenResult.value
        await this.refreshTokenRepository.deleteRefreshToken(refreshToken)
        
        const accessToken = await this.generateToken(payload)
        const newRefreshToken = await this.generateRefreshToken(payload)
        return right({
            accessToken,
            refreshToken: newRefreshToken
        })
    }

}

export namespace JwtTokenManagement {
    export type Config = {
        tokenSecret: string
        refreshTokenSecret: string
    }
}