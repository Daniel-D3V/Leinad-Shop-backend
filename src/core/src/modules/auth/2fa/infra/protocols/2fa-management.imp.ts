import { TwoFactorAuthenticationManagementInterface } from "../../application/protocols";
import { generateSecret, totp } from 'speakeasy'
import * as qrCode from "qrcode"

export class TwoFactorAuthenticationManagementImp implements TwoFactorAuthenticationManagementInterface {
    
    private async generateQrCode(otpauth_url: string): Promise<string> {
        return new Promise((resolve) =>{
            qrCode.toDataURL(otpauth_url, 
            function (err, image_data) {
                if(err) return resolve("")
                return resolve(image_data)
            })
        })
    }
    
    async generate2fa(): Promise<TwoFactorAuthenticationManagementInterface.Generate2faOutputDto> {
        
        var secret = generateSecret({ 
            length: 30,  
            issuer: "Leinad Shop"
        });
        const qrCodeString = await this.generateQrCode(secret.otpauth_url ?? "")

        return {
            secret: secret.base32,
            qrCode: qrCodeString
        }
    }
    async verify2fa({ code, secret }: TwoFactorAuthenticationManagementInterface.Verify2faInputDto): Promise<boolean> {
        return totp.verify({
            secret: secret,
            token: code,
            encoding: 'base32',
        })
    }
  
}