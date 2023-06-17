import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  BanAnnounceUsecaseInterface } from "../../domain/usecases";
import {  BanAnnounceUsecase } from "../../application/usecases";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";

export class BanAnnounceUsecaseFactory {

    static create(): BanAnnounceUsecaseInterface {
        
        const execute = async (input: BanAnnounceUsecaseInterface.InputDto): Promise<BanAnnounceUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const banAnnounceUsecase = new BanAnnounceUsecase(
                    prismaAnnounceManagementRepository,
                     outboxEmitter
                    )
                return await banAnnounceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}