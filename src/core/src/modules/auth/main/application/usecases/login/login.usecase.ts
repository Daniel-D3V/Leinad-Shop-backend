import { Either, left, right } from "@/modules/@shared/logic";
import { UserRepositoryInterface } from "@/modules/auth/main/domain/repositories";
import { InvalidCredentialsError } from "./errors";
import { LoginUsecaseInterface } from "@/modules/auth/main/domain/usecases";
import { Temporary2faTokenFacadeInterface, TwoFactorAuthenticationFacadeInterface } from "@/modules/auth/2fa/facades";
import { AuthTokenFacadeInterface } from "../../../facades";

export class LoginUsecase implements LoginUsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly authTokenFacade: AuthTokenFacadeInterface,
        private readonly twoFactorAuthenticationFacade: TwoFactorAuthenticationFacadeInterface,
        private readonly temporary2faTokenFacade: Temporary2faTokenFacadeInterface
    ){}


    async execute({ email, password }: LoginUsecaseInterface.InputDto): Promise<LoginUsecaseInterface.OutputDto> {

        const userEntity = await this.userRepository.findByEmail(email)
        if(!userEntity) return left([ new InvalidCredentialsError() ])

        const passwordMatch = userEntity.comparePassword(password)
        if(!passwordMatch) return left([ new InvalidCredentialsError() ])

        const hasValid2fa = await this.twoFactorAuthenticationFacade.hasValid2fa(userEntity.id)
        if(hasValid2fa) {
            return await this.returnTemporaryTokenResult(userEntity.id)
        }
        return await this.returnTokenResult(userEntity.id)
    }

    private async returnTemporaryTokenResult(userId: string): Promise<LoginUsecaseInterface.OutputDto> {
        const temporaryToken = await this.temporary2faTokenFacade.generate({
            userId
        })
        return right({
            loginType: "2FA",
            temporaryToken: temporaryToken.temporary2faToken
        })
    }

    private async returnTokenResult(userId: string): Promise<LoginUsecaseInterface.OutputDto> {
        const { accessToken, refreshToken } = await this.authTokenFacade.generateTokens(userId)
        return right({ 
            loginType: "1FA",
            accessToken,
            refreshToken
        })
    }
}