import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateAnnounceInfoUsecaseInterface } from "../../domain/usecases";
import { CreateAnnounceInfoUsecase } from "../../application/usecases";
import { PrismaAnnounceInfoRepository } from "../../infra/repositories";

export class CreateAnnounceInfoUsecaseFactory {

    static create(): CreateAnnounceInfoUsecaseInterface {
        
        const execute = async (input: CreateAnnounceInfoUsecaseInterface.InputDto): Promise<CreateAnnounceInfoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceInfoRepository = new PrismaAnnounceInfoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createAnnounceInfoUsecase = new CreateAnnounceInfoUsecase(
                    prismaAnnounceInfoRepository,
                     outboxEmitter
                    )
                return await createAnnounceInfoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}