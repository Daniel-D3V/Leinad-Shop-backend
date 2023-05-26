import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import { ChangeAnnounceImagesUsecaseInterface } from "../../domain/usecases"
import { ChangeAnnouceImagesUsecase } from "../../application/usecases"
import { PrismaAnnounceImagesRepository } from "../../infra/repositories"

export class ChangeAnnonceImagesUsecaseFactory {

    static create(): ChangeAnnounceImagesUsecaseInterface {

        const execute = async (input: ChangeAnnounceImagesUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceImages = new PrismaAnnounceImagesRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnouceImagesUsecase = new ChangeAnnouceImagesUsecase(prismaAnnounceImages, outboxEmitter)
                return await changeAnnouceImagesUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}