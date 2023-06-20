
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { Generate2faUsecaseInterface } from "../../domain/usecases"
import { Generate2faUsecase } from "../../application/usecases"
import { PrismaTwoFactorAuthenticationRepository } from "../../infra/repositories"
import { PrismaClient } from "@prisma/client"
import { TwoFactorAuthenticationManagementImp } from "../../infra/protocols"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"


export class Generate2faUsecaseFactory {

    static create(): Generate2faUsecaseInterface {

        const execute = async (input: Generate2faUsecaseInterface.InputDto): Promise<Generate2faUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaTwoFactorAuthenticationRepository = new PrismaTwoFactorAuthenticationRepository(prisma as PrismaClient)
                const twoFactorAuthenticationManagementImp = new TwoFactorAuthenticationManagementImp()
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const generate2faUsecase = new Generate2faUsecase(
                    prismaTwoFactorAuthenticationRepository,
                    twoFactorAuthenticationManagementImp,
                    outboxEmitter
                )
                return await generate2faUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}