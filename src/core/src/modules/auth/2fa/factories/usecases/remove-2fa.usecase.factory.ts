
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { Remove2faUsecaseInterface } from "../../domain/usecases"
import { Remove2faUsecase } from "../../application/usecases"
import { PrismaTwoFactorAuthenticationRepository } from "../../infra/repositories"
import { PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"


export class Remove2faUsecaseFactory {

    static create(): Remove2faUsecaseInterface {

        const execute = async (input: Remove2faUsecaseInterface.InputDto): Promise<Remove2faUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaTwoFactorAuthenticationRepository = new PrismaTwoFactorAuthenticationRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const remove2faUsecase = new Remove2faUsecase(
                    prismaTwoFactorAuthenticationRepository,
                    outboxEmitter
                )
                return await remove2faUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}