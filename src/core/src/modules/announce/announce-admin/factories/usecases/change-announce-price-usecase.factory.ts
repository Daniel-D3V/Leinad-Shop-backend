import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import {   ChangeAnnouncePriceUsecaseInterface } from "../../domain/usecases"
import { ChangeAnnouncePriceUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"

export class ChangeAnnouncePriceUsecaseFactory {

    static create(): ChangeAnnouncePriceUsecaseInterface {

        const execute = async (input: ChangeAnnouncePriceUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceRepository = new PrismaAnnounceRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnouncePriceUsecase = new ChangeAnnouncePriceUsecase(prismaAnnounceRepository, outboxEmitter)
                return await changeAnnouncePriceUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}