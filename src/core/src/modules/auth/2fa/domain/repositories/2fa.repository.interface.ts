import { TwoFactorAuthenticationEntity } from "../entities";

export interface TwoFactorAuthenticationRepositoryInterface { 
    create(twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity): Promise<void>
    findByUserId(userId: string): Promise<TwoFactorAuthenticationEntity | null>
}