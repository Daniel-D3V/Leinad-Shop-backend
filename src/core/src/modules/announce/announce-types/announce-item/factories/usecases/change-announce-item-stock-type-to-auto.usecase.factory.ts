import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeAnnounceItemStockTypeToAutoUsecaseInterface } from "../../domain/usecases";
import {  ChangeAnnounceItemStockTypeToAutoUsecase } from "../../application/usecases";
import { PrismaAnnounceItemRepository } from "../../infra/repositories";

export class ChangeAnnounceItemStockTypeToAutoUsecaseFactory {

    static create(): ChangeAnnounceItemStockTypeToAutoUsecaseInterface {

        const execute = async (input: ChangeAnnounceItemStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeAnnounceItemStockTypeToAutoUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceItemRepository = new PrismaAnnounceItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceItemStockTypeToAutoUsecase = new ChangeAnnounceItemStockTypeToAutoUsecase(
                    prismaAnnounceItemRepository,
                     outboxEmitter
                    )
                return await changeAnnounceItemStockTypeToAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}