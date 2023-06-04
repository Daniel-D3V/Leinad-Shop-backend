import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockItemManagementTypeToNormalUsecaseInterface } from "../../domain/usecases";
import { PrismaStockItemManagementRepository } from "../../infra/repositories";
import { ChangeStockItemManagementTypeToNormalUsecase } from "../../application/usecases";


export class ChangeStockItemManagementTypeToNormalUsecaseFactory {

    static create(): ChangeStockItemManagementTypeToNormalUsecaseInterface {
        
        const execute = async (input: ChangeStockItemManagementTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemManagementRepository = new PrismaStockItemManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemManagementTypeToNormalUsecase = new ChangeStockItemManagementTypeToNormalUsecase(
                    prismaStockItemManagementRepository,
                    outboxEmitter
                )
                return await changeStockItemManagementTypeToNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}