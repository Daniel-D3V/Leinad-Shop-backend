import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockItemManagementTypeToManualUsecaseInterface } from "../../domain/usecases";
import { PrismaStockItemManagementRepository } from "../../infra/repositories";
import { ChangeStockItemManagementTypeToManualUsecase } from "../../application/usecases";


export class ChangeStockItemManagementTypeToManualUsecaseFactory {

    static create(): ChangeStockItemManagementTypeToManualUsecaseInterface {
        
        const execute = async (input: ChangeStockItemManagementTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToManualUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemManagementRepository = new PrismaStockItemManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemManagementTypeToManualUsecase = new ChangeStockItemManagementTypeToManualUsecase(
                    prismaStockItemManagementRepository,
                    outboxEmitter
                )
                return await changeStockItemManagementTypeToManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}