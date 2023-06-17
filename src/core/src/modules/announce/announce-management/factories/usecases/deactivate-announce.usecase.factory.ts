import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  DeactivateAnnounceUsecaseInterface } from "../../domain/usecases";
import { DeactivateAnnounceUsecase } from "../../application/usecases";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";

export class DeactivateAnnounceUsecaseFactory {

    static create(): DeactivateAnnounceUsecaseInterface {
        
        const execute = async (input: DeactivateAnnounceUsecaseInterface.InputDto): Promise<DeactivateAnnounceUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deactivateAnnounceUsecase = new DeactivateAnnounceUsecase(
                    prismaAnnounceManagementRepository,
                     outboxEmitter
                    )
                return await deactivateAnnounceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}