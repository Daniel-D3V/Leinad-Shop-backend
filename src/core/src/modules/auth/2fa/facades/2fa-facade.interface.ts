
export interface TwoFactorAuthenticationFacadeInterface {
    hasValid2fa(userId: string): Promise<boolean>
}

export namespace TwoFactorAuthenticationFacadeInterface {

}