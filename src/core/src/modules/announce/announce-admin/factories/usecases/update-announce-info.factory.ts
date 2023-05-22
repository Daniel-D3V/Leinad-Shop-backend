import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { UpdateAnnounceInfoUsecaseInterface } from "../../domain/usecases"
import { UpdateAnnounceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class UpdateAnnounceInfoUsecaseFactory {

    static create(): UpdateAnnounceInfoUsecaseInterface {

        const execute = async (input: UpdateAnnounceInfoUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateAnnounceUsecase = new UpdateAnnounceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await updateAnnounceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}