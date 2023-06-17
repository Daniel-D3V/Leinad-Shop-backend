import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeAnnounceTypeToItemUsecaseInterface } from "../../domain/usecases";
import {  ChangeAnnounceTypeToItemUsecase } from "../../application/usecases";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";

export class ChangeAnnounceTypeToItemUsecaseFactory {

    static create(): ChangeAnnounceTypeToItemUsecaseInterface {
        
        const execute = async (input: ChangeAnnounceTypeToItemUsecaseInterface.InputDto): Promise<ChangeAnnounceTypeToItemUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceTypeToItemUsecase = new ChangeAnnounceTypeToItemUsecase(
                    prismaAnnounceManagementRepository,
                     outboxEmitter
                    )
                return await changeAnnounceTypeToItemUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}