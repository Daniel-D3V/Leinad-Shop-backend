import { RefreshTokenUsecaseInterface } from "@/modules/auth/main/domain/usecases";
import { TokenManagementInterface } from "../../protocols";
import { left, right } from "@/modules/@shared/logic";

export class RefreshTokenUsecase implements RefreshTokenUsecaseInterface {
    
    constructor(
        private readonly tokenManagement: TokenManagementInterface
    ) {}

    async execute({ refreshToken }: RefreshTokenUsecaseInterface.InputDto): Promise<RefreshTokenUsecaseInterface.OutputDto> {
        
        const tokenManagementResult = await this.tokenManagement.generateAccessTokenFromRefreshToken(refreshToken)
        if(tokenManagementResult.isLeft()) return left(tokenManagementResult.value)

        return right({
            ...tokenManagementResult.value
        })
    }
}