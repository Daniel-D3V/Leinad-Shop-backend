import { TokenPayloadModel } from "../../application/models";
import { TokenManagementInterface } from "../../application/protocols";
import { UserRepositoryInterface } from "../../domain/repositories";
import { AuthTokenFacadeInterface } from "../../facades";

export class AuthTokenFacadeImp implements AuthTokenFacadeInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly tokenManagement: TokenManagementInterface
    ){}

    async generateTokens(userId: string): Promise<AuthTokenFacadeInterface.GenerateTokenOutput> {

        const userEntity = await this.userRepository.findById(userId)
        const tokenPayload: TokenPayloadModel = {
            userId,
            email: userEntity?.email ?? ""
        }
        const accessToken = await this.tokenManagement.generateToken(tokenPayload)
        const refreshToken = await this.tokenManagement.generateRefreshToken(tokenPayload)

        return {
            accessToken,
            refreshToken
        }
    }
}