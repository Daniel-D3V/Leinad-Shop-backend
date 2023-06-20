import { TokenPayloadModel } from "../../application/models";
import { TokenManagementInterface } from "../../application/protocols";
import { AuthTokenFacadeInterface } from "../../facades";

export class AuthTokenFacadeImp implements AuthTokenFacadeInterface {

    constructor(
        private readonly tokenManagement: TokenManagementInterface
    ){}

    async generateTokens(tokenPayload: TokenPayloadModel): Promise<AuthTokenFacadeInterface.GenerateTokenOutput> {

        const accessToken = await this.tokenManagement.generateToken(tokenPayload)
        const refreshToken = await this.tokenManagement.generateRefreshToken(tokenPayload)
        return {
            accessToken,
            refreshToken
        }
    }
}