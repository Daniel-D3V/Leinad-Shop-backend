import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeAnnounceInfoTitleUsecaseInterface } from "../../domain/usecases";
import { ChangeAnnounceInfoTitleUsecase } from "../../application/usecases";
import { PrismaAnnounceInfoRepository } from "../../infra/repositories";

export class ChangeAnnounceInfoTitleUsecaseFactory {

    static create(): ChangeAnnounceInfoTitleUsecaseInterface {
        
        const execute = async (input: ChangeAnnounceInfoTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceInfoTitleUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceInfoRepository = new PrismaAnnounceInfoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceInfoTitleUsecase = new ChangeAnnounceInfoTitleUsecase(
                    prismaAnnounceInfoRepository,
                     outboxEmitter
                    )
                return await changeAnnounceInfoTitleUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}