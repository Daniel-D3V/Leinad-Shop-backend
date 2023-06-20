import { TwoFactorAuthenticationRepositoryInterface } from "../../domain/repositories";
import { TwoFactorAuthenticationFacadeInterface } from "../../facades";

export class TwoFactorAuthenticationFacadeImp implements TwoFactorAuthenticationFacadeInterface {
    
    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface
    ){}

    async hasValid2fa(userId: string): Promise<boolean> {
        const twoFactorAuthenticationEntity = await this.twoFactorAuthenticationRepository.findByUserId(userId)
        return twoFactorAuthenticationEntity?.isValid() ?? false
    }

}