import { left, right } from "@/modules/@shared/logic";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";
import { Verify2faCodeUsecaseInterface } from "../../../domain/usecases";
import { Temporary2faTokenFacadeInterface } from "../../../facades";
import { TwoFactorAuthenticationManagementInterface } from "../../protocols";
import { TemporaryTokenNotFoundError } from "./errors";
import { Invalid2faCodeError, TwoFactorIsNotValidError, TwoFactorNotFoundError } from "../_errors";


export class Verify2faCodeUsecase implements Verify2faCodeUsecaseInterface {

    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface,
        private readonly twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface,
        private readonly temporary2faTokenFacade: Temporary2faTokenFacadeInterface
    ){}
    
    async execute({ temporaryToken, code }: Verify2faCodeUsecaseInterface.InputDto): Promise<Verify2faCodeUsecaseInterface.OutputDto> {
        
        const temporaryTokenResult = await this.temporary2faTokenFacade.find(temporaryToken)
        if(!temporaryTokenResult) return left([ new TemporaryTokenNotFoundError() ])

        const twoFactorAuthenticationEntity = await this.twoFactorAuthenticationRepository.findByUserId(temporaryTokenResult.userId)
        if(!twoFactorAuthenticationEntity) return left([ new TwoFactorNotFoundError() ])

        if(!twoFactorAuthenticationEntity.isValid()) return left([ new TwoFactorIsNotValidError() ])

        const isTokenValid = await this.twoFactorAuthenticationManagement.verify2fa({
            code,
            secret: twoFactorAuthenticationEntity.secret
        })
        if(!isTokenValid) return left([ new Invalid2faCodeError() ])

        await this.temporary2faTokenFacade.delete(temporaryToken)

        return right(null)
    }
}