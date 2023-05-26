import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { BanAnnounceUsecaseInterface } from "../../domain/usecases"
import { BanAnnounceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class BanAnnounceUsecaseFactory {

    static create(): BanAnnounceUsecaseInterface {

        const execute = async (input: BanAnnounceUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const banAnnounceUsecase = new BanAnnounceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await banAnnounceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}