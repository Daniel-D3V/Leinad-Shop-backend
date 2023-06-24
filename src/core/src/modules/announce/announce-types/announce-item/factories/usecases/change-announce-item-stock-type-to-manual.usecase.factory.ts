import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeAnnounceItemStockTypeToManualUsecaseInterface } from "../../domain/usecases";
import {  ChangeAnnounceItemStockTypeToManualUsecase } from "../../application/usecases";
import { PrismaAnnounceItemRepository } from "../../infra/repositories";

export class ChangeAnnounceItemStockTypeToManualUsecaseFactory {

    static create(): ChangeAnnounceItemStockTypeToManualUsecaseInterface {

        const execute = async (input: ChangeAnnounceItemStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeAnnounceItemStockTypeToManualUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceItemRepository = new PrismaAnnounceItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceItemStockTypeToManualUsecase = new ChangeAnnounceItemStockTypeToManualUsecase(
                    prismaAnnounceItemRepository,
                     outboxEmitter
                    )
                return await changeAnnounceItemStockTypeToManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}