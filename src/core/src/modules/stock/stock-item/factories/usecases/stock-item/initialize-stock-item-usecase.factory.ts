import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { InitializeStockItemUsecaseInterface } from "../../../domain/usecases";
import { PrismaStockItemRepository } from "../../../infra/repositories";
import { InitializeStockItemUsecase } from "../../../application/usecases";

export class InitializeStockItemUsecaseFactory {

    static create(): InitializeStockItemUsecaseInterface {
        
        const execute = async (input: InitializeStockItemUsecaseInterface.InputDto): Promise<InitializeStockItemUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemRepository = new PrismaStockItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const initializeStockItemUsecase = new InitializeStockItemUsecase(prismaStockItemRepository, outboxEmitter)
                return await initializeStockItemUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}