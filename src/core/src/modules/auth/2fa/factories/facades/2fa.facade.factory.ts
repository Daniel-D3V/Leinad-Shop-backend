import { PrismaClient } from "@prisma/client";
import { TwoFactorAuthenticationFacadeImp } from "../../infra/facades";
import { TwoFactorAuthenticationFacadeInterface } from "../../facades";
import { TwoFactorAuthenticationManagementImp } from "../../infra/protocols";



export class TwoFactorAuthenticationFacadeFactory {
    
    static create(prismaClient: PrismaClient): TwoFactorAuthenticationFacadeInterface {
        
        const twoFactorAuthenticationFacadeImp = new TwoFactorAuthenticationFacadeImp(
            twoFactorAuthenticationManagementImp
        )
        return twoFactorAuthenticationFacadeImp;
    }
}