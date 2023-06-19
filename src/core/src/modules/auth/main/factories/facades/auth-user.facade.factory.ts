import { PrismaClient } from "@prisma/client";
import { AuthUserFacadeInterface } from "../../facades";
import { AuthUserFacadeImp } from "../../infra/facades";
import { PrismaUserRepository } from "../../infra/repositories";


export class AuthUserFacadeFactory {
    
    static create(prismaClient: PrismaClient): AuthUserFacadeInterface {
        
        const prismaUserRepository = new PrismaUserRepository(prismaClient)
        const authUserFacadeImp = new AuthUserFacadeImp(prismaUserRepository)
        return authUserFacadeImp;
    }
}