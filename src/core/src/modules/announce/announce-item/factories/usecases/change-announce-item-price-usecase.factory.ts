import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeAnnounceItemPriceUsecaseInterface } from "../../domain/usecases";
import { ChangeAnnounceItemPriceUsecase } from "../../application/usecases";
import { PrismaAnnounceItemRepository } from "../../infra/repositories";

export class ChangeAnnounceItemPriceUsecaseFactory {

    static create(): ChangeAnnounceItemPriceUsecaseInterface {
        
        const execute = async (input: ChangeAnnounceItemPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceItemPriceUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceItemRepository = new PrismaAnnounceItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceItemPriceUsecase = new ChangeAnnounceItemPriceUsecase(prismaAnnounceItemRepository, outboxEmitter)
                return await changeAnnounceItemPriceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}