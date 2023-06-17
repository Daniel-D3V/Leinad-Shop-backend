import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {   ChangeAnnounceTypeToNormalUsecaseInterface } from "../../domain/usecases";
import {  ChangeAnnounceTypeToItemUsecase, ChangeAnnounceTypeToNormalUsecase } from "../../application/usecases";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";

export class ChangeAnnounceTypeToNormalUsecaseFactory {

    static create(): ChangeAnnounceTypeToNormalUsecaseInterface {
        
        const execute = async (input: ChangeAnnounceTypeToNormalUsecaseInterface.InputDto): Promise<ChangeAnnounceTypeToNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceTypeToNormalUsecase = new ChangeAnnounceTypeToNormalUsecase(
                    prismaAnnounceManagementRepository,
                     outboxEmitter
                    )
                return await changeAnnounceTypeToNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}