
export interface TwoFactorAuthenticationManagementInterface {
    generate2fa (input: TwoFactorAuthenticationManagementInterface.GenerateInput): Promise<TwoFactorAuthenticationManagementInterface.Generate2faOutputDto>
    verify2fa (input: TwoFactorAuthenticationManagementInterface.Verify2faInputDto): Promise<boolean>
}

export namespace TwoFactorAuthenticationManagementInterface {
    
    export type GenerateInput = {
        userId: string
    }

    export type Verify2faInputDto = {
        secret: string
        code: string
    }

    export type Generate2faOutputDto = {
        secret: string
        qrCode: string
    }

}