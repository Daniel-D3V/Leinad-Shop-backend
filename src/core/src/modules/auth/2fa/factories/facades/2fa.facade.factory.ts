import { PrismaClient } from "@prisma/client";
import { TwoFactorAuthenticationFacadeImp } from "../../infra/facades";
import { TwoFactorAuthenticationFacadeInterface } from "../../facades";



export class TwoFactorAuthenticationFacadeFactory {
    
    static create(prismaClient: PrismaClient): TwoFactorAuthenticationFacadeInterface {
        
        const batata  = { }
        const twoFactorAuthenticationFacadeImp = new TwoFactorAuthenticationFacadeImp(
            batata as any
        )
        return twoFactorAuthenticationFacadeImp;
    }
}