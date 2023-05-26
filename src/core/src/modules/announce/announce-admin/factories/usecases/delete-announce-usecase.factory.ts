import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { DeleteAnnounceUsecaseInterface } from "../../domain/usecases"
import { DeleteAnnounceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class DeleteAnnounceUsecaseFactory {

    static create(): DeleteAnnounceUsecaseInterface {

        const execute = async (input: DeleteAnnounceUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteAnnounceUsecase = new DeleteAnnounceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await deleteAnnounceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}