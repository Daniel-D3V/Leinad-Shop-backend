import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeAnnounceInfoDescriptionUsecaseInterface } from "../../domain/usecases";
import { ChangeAnnounceInfoDescriptionUsecase, CreateAnnounceInfoUsecase } from "../../application/usecases";
import { PrismaAnnounceInfoRepository } from "../../infra/repositories";

export class ChangeAnnounceInfoDescriptionUsecaseFactory {

    static create(): ChangeAnnounceInfoDescriptionUsecaseInterface {
        
        const execute = async (input: ChangeAnnounceInfoDescriptionUsecaseInterface.InputDto): Promise<ChangeAnnounceInfoDescriptionUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceInfoRepository = new PrismaAnnounceInfoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceInfoDescriptionUsecase = new ChangeAnnounceInfoDescriptionUsecase(
                    prismaAnnounceInfoRepository,
                     outboxEmitter
                    )
                return await changeAnnounceInfoDescriptionUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}