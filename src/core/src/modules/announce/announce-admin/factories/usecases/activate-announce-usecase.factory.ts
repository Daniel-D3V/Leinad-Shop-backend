import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { ActivateAnnounceUsecaseInterface } from "../../domain/usecases"
import { ActivateAnnounceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class ActivateAnnounceUsecaseFactory {

    static create(): ActivateAnnounceUsecaseInterface {

        const execute = async (input: ActivateAnnounceUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const activateAnnounceUsecase = new ActivateAnnounceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await activateAnnounceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}