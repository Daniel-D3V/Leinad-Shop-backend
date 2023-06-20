
export interface AuthTokenFacadeInterface {
    generateTokens(userId: string): Promise<AuthTokenFacadeInterface.GenerateTokenOutput>
}

export namespace AuthTokenFacadeInterface{
    export type GenerateTokenOutput = {
        accessToken: string
        refreshToken: string
    }
}