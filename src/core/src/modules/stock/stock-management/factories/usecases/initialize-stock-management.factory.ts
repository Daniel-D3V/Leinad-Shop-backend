import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  InitializeStockManagementUsecaseInterface } from "../../domain/usecases";
import { InitializeStockManagementUsecase } from "../../application/usecases";
import { PrismaStockManagementRepository } from "../../infra/repositories/prisma/prisma-stock-management.repository";

export class InitializeStockManagementFactory {

    static create(): InitializeStockManagementUsecaseInterface {
        
        const execute = async (input: InitializeStockManagementUsecaseInterface.InputDto): Promise<InitializeStockManagementUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockManagementRepository = new PrismaStockManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const initializeStockManagementUsecase = new InitializeStockManagementUsecase(prismaStockManagementRepository, outboxEmitter)
                return await initializeStockManagementUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}