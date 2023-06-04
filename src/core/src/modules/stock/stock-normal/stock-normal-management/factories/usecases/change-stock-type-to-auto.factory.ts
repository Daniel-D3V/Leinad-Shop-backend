import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeStockTypeToAutoUsecaseInterface } from "../../domain/usecases";
import { ChangeStockTypeToAutoUsecase } from "../../application/usecases";
import { PrismaStockManagementRepository } from "../../infra/repositories/prisma/prisma-stock-management.repository";

export class ChangeStockTypeToAutoFactory {

    static create(): ChangeStockTypeToAutoUsecaseInterface {
        
        const execute = async (input: ChangeStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockTypeToAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockManagementRepository = new PrismaStockManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockTypeToAutoUsecase = new ChangeStockTypeToAutoUsecase(prismaStockManagementRepository, outboxEmitter)
                return await changeStockTypeToAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}