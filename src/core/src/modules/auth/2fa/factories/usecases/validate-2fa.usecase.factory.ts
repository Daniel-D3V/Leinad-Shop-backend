
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  Validate2faUsecaseInterface } from "../../domain/usecases"
import { Validate2faUsecase } from "../../application/usecases"
import { PrismaTwoFactorAuthenticationRepository } from "../../infra/repositories"
import { PrismaClient } from "@prisma/client"
import { TwoFactorAuthenticationManagementImp } from "../../infra/protocols"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"


export class Validate2faUsecaseFactory {

    static create(): Validate2faUsecaseInterface {

        const execute = async (input: Validate2faUsecaseInterface.InputDto): Promise<Validate2faUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaTwoFactorAuthenticationRepository = new PrismaTwoFactorAuthenticationRepository(prisma as PrismaClient)
                const twoFactorAuthenticationManagementImp = new TwoFactorAuthenticationManagementImp()
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const validate2faUsecase = new Validate2faUsecase(
                    prismaTwoFactorAuthenticationRepository,
                    twoFactorAuthenticationManagementImp,
                    outboxEmitter
                )
                return await validate2faUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}