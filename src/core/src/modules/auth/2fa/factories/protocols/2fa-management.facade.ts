import { AuthUserFacadeFactory } from "@/modules/auth/main/factories";
import { TwoFactorAuthenticationManagementInterface } from "../../application/protocols";
import { TwoFactorAuthenticationManagementImp } from "../../infra/protocols";
import { PrismaClient } from "@prisma/client";



export class TwoFactorAuthenticationManagementFactory {
    
    static create(prismaClient: PrismaClient): TwoFactorAuthenticationManagementInterface {

        const authUserFacade = AuthUserFacadeFactory.create(prismaClient)
        const twoFactorAuthenticationManagementImp = new TwoFactorAuthenticationManagementImp(
            authUserFacade
        )
        return twoFactorAuthenticationManagementImp;
    }
}