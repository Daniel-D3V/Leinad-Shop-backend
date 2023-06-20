import { TokenPayloadModel } from "../application/models";

export interface AuthTokenFacadeInterface {
    generateTokens(tokenPayload: TokenPayloadModel): Promise<AuthTokenFacadeInterface.GenerateTokenOutput>
}

export namespace AuthTokenFacadeInterface{
    export type GenerateTokenOutput = {
        accessToken: string
        refreshToken: string
    }
}