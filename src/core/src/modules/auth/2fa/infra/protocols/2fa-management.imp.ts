import { TwoFactorAuthenticationManagementInterface } from "../../application/protocols";
import * as speakeasy from 'speakeasy'
import * as qrCode from "qrcode"
import { AuthUserFacadeInterface } from "@/modules/auth/main/facades";

export class TwoFactorAuthenticationManagementImp implements TwoFactorAuthenticationManagementInterface {
    
    constructor(
        private readonly AuthUserFacade: AuthUserFacadeInterface
    ){}

    private async generateQrCode(otpauth_url: string): Promise<string> {
        return new Promise((resolve) =>{
            qrCode.toDataURL(otpauth_url, 
            function (err, image_data) {
                if(err) return resolve("")
                return resolve(image_data)
            })
        })
    }
    
    async generate2fa({ userId }: TwoFactorAuthenticationManagementInterface.GenerateInput): Promise<TwoFactorAuthenticationManagementInterface.Generate2faOutputDto> {
        const email = await this.AuthUserFacade.getEmailByUserId(userId)
        var secret = speakeasy.generateSecret({ 
            length: 30,  
            issuer : "Leinad Shop",
            name: `Leinad Shop: ${email}`
        });
        const qrCodeString = await this.generateQrCode(secret.otpauth_url ?? "")

        return {
            secret: secret.base32,
            qrCode: qrCodeString
        }
    }
    async verify2fa({ code, secret }: TwoFactorAuthenticationManagementInterface.Verify2faInputDto): Promise<boolean> {
        return speakeasy.totp.verify({
            secret: secret,
            token: code,
            encoding: 'base32',
        })
    }
    
}