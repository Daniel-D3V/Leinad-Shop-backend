
import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { InitializeStockNormalUsecaseInterface } from "../../domain/usecases";
import { InitializeStockNormalUsecase } from "../../application/usecases";
import { PrismaStockNormalRepository } from "../../infra/repositories";

export class InitializeStockNormalUsecaseFactory {

    static create(): InitializeStockNormalUsecaseInterface {
        
        const execute = async (input: InitializeStockNormalUsecaseInterface.InputDto): Promise<InitializeStockNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalRepository = new PrismaStockNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const initializeStockNormalUsecase = new InitializeStockNormalUsecase(prismaStockNormalRepository, outboxEmitter)
                return await initializeStockNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}