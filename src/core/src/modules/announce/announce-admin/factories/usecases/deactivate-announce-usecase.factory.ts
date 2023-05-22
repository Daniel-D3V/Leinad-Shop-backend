import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import {  DeactivateAnnounceUsecaseInterface } from "../../domain/usecases"
import { DeactivateAnnounceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class DeactivateAnnounceUsecaseFactory {

    static create(): DeactivateAnnounceUsecaseInterface {

        const execute = async (input: DeactivateAnnounceUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deactivateAnnounceUsecase = new DeactivateAnnounceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await deactivateAnnounceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}