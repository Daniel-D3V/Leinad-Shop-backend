import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeAnnounceItemTitleUsecaseInterface } from "../../domain/usecases";
import {  ChangeAnnounceItemTitleUsecase } from "../../application/usecases";
import { PrismaAnnounceItemRepository } from "../../infra/repositories";

export class ChangeAnnounceItemTitleUsecaseFactory {

    static create(): ChangeAnnounceItemTitleUsecaseInterface {

        const execute = async (input: ChangeAnnounceItemTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceItemTitleUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceItemRepository = new PrismaAnnounceItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceItemPriceUsecase = new ChangeAnnounceItemTitleUsecase(
                    prismaAnnounceItemRepository,
                     outboxEmitter
                    )
                return await changeAnnounceItemPriceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}