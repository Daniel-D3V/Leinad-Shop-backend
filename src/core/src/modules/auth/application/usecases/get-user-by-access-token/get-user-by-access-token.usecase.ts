import { UserRepositoryInterface } from "@/modules/auth/domain/repositories";
import { GetUserByAccessTokenUsecaseInterface } from "@/modules/auth/domain/usecases";
import { TokenManagementInterface } from "../../protocols";
import { left, right } from "@/modules/@shared/logic";
import { UserNotFoundError } from "../_errors";

export class GetUserByAccessTokenUsecase implements GetUserByAccessTokenUsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly tokenManagement: TokenManagementInterface
    ){}

    async execute({ accessToken }: GetUserByAccessTokenUsecaseInterface.InputDto): Promise<GetUserByAccessTokenUsecaseInterface.OutputDto> {
        
        const tokenManagementResult = await this.tokenManagement.verifyToken(accessToken)
        if(tokenManagementResult.isLeft()) return left(tokenManagementResult.value)

        const { userId } = tokenManagementResult.value
        const userEntity = await this.userRepository.findById(userId)
        if(!userEntity) return left([ new UserNotFoundError() ])

        return right({
            id: userEntity.id,
            email: userEntity.email
        })
    }
}