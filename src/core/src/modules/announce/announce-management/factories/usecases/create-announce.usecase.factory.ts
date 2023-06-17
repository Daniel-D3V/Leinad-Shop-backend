import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateAnnounceUsecaseInterface } from "../../domain/usecases";
import { CreateAnnounceUsecase } from "../../application/usecases";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";

export class CreateAnnounceUsecaseFactory {

    static create(): CreateAnnounceUsecaseInterface {
        
        const execute = async (input: CreateAnnounceUsecaseInterface.InputDto): Promise<CreateAnnounceUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createAnnounceUsecaseInterface = new CreateAnnounceUsecase(
                    prismaAnnounceManagementRepository,
                     outboxEmitter
                    )
                return await createAnnounceUsecaseInterface.execute(input)
            })
        }

        return {
            execute
        }
    }
}