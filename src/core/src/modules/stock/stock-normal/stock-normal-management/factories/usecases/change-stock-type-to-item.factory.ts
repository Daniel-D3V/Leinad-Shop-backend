import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {   ChangeStockTypeToItemUsecaseInterface } from "../../domain/usecases";
import {  ChangeStockTypeToItemUsecase, ChangeStockTypeToNormalUsecase, } from "../../application/usecases";
import { PrismaStockManagementRepository } from "../../infra/repositories/prisma/prisma-stock-management.repository";

export class ChangeStockTypeToItemFactory {

    static create(): ChangeStockTypeToItemUsecaseInterface {
        
        const execute = async (input: ChangeStockTypeToItemUsecaseInterface.InputDto): Promise<ChangeStockTypeToItemUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockManagementRepository = new PrismaStockManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockTypeToItemUsecase = new ChangeStockTypeToItemUsecase(prismaStockManagementRepository, outboxEmitter)
                return await changeStockTypeToItemUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}