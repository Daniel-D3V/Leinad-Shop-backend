import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaStockNormalManagementRepository } from "../../infra/repositories";
import { ChangeStockNormalManagementTypeToNormalUsecaseInterface } from "../../domain/usecases";
import { ChangeStockNormalManagementTypeToNormalUsecase } from "../../application/usecases";

export class ChangeStockNormalManagementTypeToNormalFactory {

    static create(): ChangeStockNormalManagementTypeToNormalUsecaseInterface {
        
        const execute = async (input: ChangeStockNormalManagementTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalManagementRepository = new PrismaStockNormalManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockNormalManagementTypeToNormalUsecase = new ChangeStockNormalManagementTypeToNormalUsecase(
                    prismaStockNormalManagementRepository, 
                    outboxEmitter
                )
                return await changeStockNormalManagementTypeToNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}