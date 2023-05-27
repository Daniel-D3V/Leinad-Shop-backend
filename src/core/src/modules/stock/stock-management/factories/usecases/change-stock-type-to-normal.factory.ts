import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {   ChangeStockTypeToNormalUsecaseInterface } from "../../domain/usecases";
import {  ChangeStockTypeToNormalUsecase, } from "../../application/usecases";
import { PrismaStockManagementRepository } from "../../infra/repositories/prisma/prisma-stock-management.repository";

export class ChangeStockTypeToNormalFactory {

    static create(): ChangeStockTypeToNormalUsecaseInterface {
        
        const execute = async (input: ChangeStockTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockTypeToNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockManagementRepository = new PrismaStockManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockTypeToNormalUsecase = new ChangeStockTypeToNormalUsecase(prismaStockManagementRepository, outboxEmitter)
                return await changeStockTypeToNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}