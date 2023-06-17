import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ActivateAnnounceUsecaseInterface } from "../../domain/usecases";
import { ActivateAnnounceUsecase } from "../../application/usecases";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";

export class ActivateAnnounceUsecaseFactory {

    static create(): ActivateAnnounceUsecaseInterface {
        
        const execute = async (input: ActivateAnnounceUsecaseInterface.InputDto): Promise<ActivateAnnounceUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const activateAnnounceUsecase = new ActivateAnnounceUsecase(
                    prismaAnnounceManagementRepository,
                     outboxEmitter
                    )
                return await activateAnnounceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}