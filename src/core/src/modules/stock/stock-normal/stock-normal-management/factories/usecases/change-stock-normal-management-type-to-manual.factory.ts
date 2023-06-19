import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaStockNormalManagementRepository } from "../../infra/repositories";
import { ChangeStockNormalManagementTypeToManualUsecaseInterface } from "../../domain/usecases";
import { ChangeStockNormalManagementTypeToManualUsecase } from "../../application/usecases";

export class ChangeStockNormalManagementTypeToManualFactory {

    static create(): ChangeStockNormalManagementTypeToManualUsecaseInterface {
        
        const execute = async (input: ChangeStockNormalManagementTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToManualUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalManagementRepository = new PrismaStockNormalManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockNormalManagementTypeToManualUsecase = new ChangeStockNormalManagementTypeToManualUsecase(
                    prismaStockNormalManagementRepository, 
                    outboxEmitter
                )
                return await changeStockNormalManagementTypeToManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}