import { Either, left, right } from "@/modules/@shared/logic";
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories";
import { InvalidCredentialsError } from "./errors";
import { TokenManagementInterface } from "../../protocols";
import { LoginUsecaseInterface } from "@/modules/auth/domain/usecases";
import { TokenPayloadModel } from "../../models";

export class LoginUsecase implements LoginUsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly tokenManagement: TokenManagementInterface
    ){}


    async execute({ email, password }: LoginUsecaseInterface.InputDto): Promise<LoginUsecaseInterface.OutputDto> {

        const userEntity = await this.userRepository.findByEmail(email)
        if(!userEntity) return left([ new InvalidCredentialsError() ])

        const passwordMatch = userEntity.comparePassword(password)
        if(!passwordMatch) return left([ new InvalidCredentialsError() ])

        const tokenPayload: TokenPayloadModel = {
            email: userEntity.email,
            userId: userEntity.id
        }
        const accessToken = await this.tokenManagement.generateToken(tokenPayload)
        const refreshToken = await this.tokenManagement.generateRefreshToken(tokenPayload)
        
        return right({ 
            refreshToken,
            accessToken
        })
    }
}