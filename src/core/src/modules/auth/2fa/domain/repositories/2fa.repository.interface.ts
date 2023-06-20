import { TwoFactorAuthenticationEntity } from "../entities";

export interface TwoFactorAuthenticationRepositoryInterface { 
    create(twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity): Promise<void>
    findByUserId(userId: string): Promise<TwoFactorAuthenticationEntity | null>
    update(twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity): Promise<void>
    delete(id: string): Promise<void>
}