
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {   Verify2faCodeUsecaseInterface } from "../../domain/usecases"
import { Verify2faCodeUsecase } from "../../application/usecases"
import { PrismaTwoFactorAuthenticationRepository } from "../../infra/repositories"
import { PrismaClient } from "@prisma/client"
import { TwoFactorAuthenticationManagementImp } from "../../infra/protocols"
import { Temporary2faTokenFacadeFactory } from "../facades"
import { AuthTokenFacadeFactory } from "@/modules/auth/main/factories"
import { TwoFactorAuthenticationManagementFactory } from "../protocols"


export class Verify2faCodeUsecaseFactory {

    static create(): Verify2faCodeUsecaseInterface {

        const execute = async (input: Verify2faCodeUsecaseInterface.InputDto): Promise<Verify2faCodeUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaTwoFactorAuthenticationRepository = new PrismaTwoFactorAuthenticationRepository(prisma as PrismaClient)
                const twoFactorAuthenticationManagement = TwoFactorAuthenticationManagementFactory.create(prisma as PrismaClient)
                const temporary2faTokenFacade = Temporary2faTokenFacadeFactory.create()
                const authTokenFacadeFactory = AuthTokenFacadeFactory.create(prisma as PrismaClient)
                const verify2faCodeUsecase = new Verify2faCodeUsecase(
                    prismaTwoFactorAuthenticationRepository,
                    twoFactorAuthenticationManagement,
                    temporary2faTokenFacade,
                    authTokenFacadeFactory
                )
                return await verify2faCodeUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}