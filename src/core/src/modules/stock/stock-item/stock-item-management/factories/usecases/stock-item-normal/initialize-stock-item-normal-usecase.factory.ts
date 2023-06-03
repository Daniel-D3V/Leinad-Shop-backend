import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {   InitializeStockItemNormalUsecaseInterface,  } from "../../../domain/usecases";
import { PrismaStockItemNormalRepository } from "../../../infra/repositories";
import {  InitializeStockItemNormalUsecase, } from "../../../application/usecases";

export class InitializeStockItemNormalUsecaseFactory {

    static create(): InitializeStockItemNormalUsecaseInterface {
        
        const execute = async (input: InitializeStockItemNormalUsecaseInterface.InputDto): Promise<InitializeStockItemNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemNormalRepository = new PrismaStockItemNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const initializeStockItemNormalUsecase = new InitializeStockItemNormalUsecase(prismaStockItemNormalRepository, outboxEmitter)
                return await initializeStockItemNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}