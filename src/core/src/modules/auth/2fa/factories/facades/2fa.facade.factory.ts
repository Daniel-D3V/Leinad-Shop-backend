import { PrismaClient } from "@prisma/client";
import { TwoFactorAuthenticationFacadeImp } from "../../infra/facades";
import { TwoFactorAuthenticationFacadeInterface } from "../../facades";
import { PrismaTwoFactorAuthenticationRepository } from "../../infra/repositories";



export class TwoFactorAuthenticationFacadeFactory {
    
    static create(prismaClient: PrismaClient): TwoFactorAuthenticationFacadeInterface {
        
        const prismaTwoFactorAuthenticationRepository = new PrismaTwoFactorAuthenticationRepository(prismaClient )
        const twoFactorAuthenticationFacadeImp = new TwoFactorAuthenticationFacadeImp(
            prismaTwoFactorAuthenticationRepository
        )
        return twoFactorAuthenticationFacadeImp;
    }
}