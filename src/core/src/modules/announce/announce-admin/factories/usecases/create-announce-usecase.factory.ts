import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { CreateAnnounceUsecaseInterface } from "../../domain/usecases"
import { CreateAnnounceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class CreateAnnounceUsecaseFactory {

    static create(): CreateAnnounceUsecaseInterface {

        const execute = async (input: CreateAnnounceUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createAnnounceUsecase = new CreateAnnounceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await createAnnounceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}