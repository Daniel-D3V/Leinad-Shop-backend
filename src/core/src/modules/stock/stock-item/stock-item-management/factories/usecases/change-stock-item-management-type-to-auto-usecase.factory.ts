import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockItemManagementTypeToAutoUsecaseInterface } from "../../domain/usecases";
import { PrismaStockItemManagementRepository } from "../../infra/repositories";
import { ChangeStockItemManagementTypeToAutoUsecase } from "../../application/usecases";

export class ChangeStockItemManagementTypeToAutoUsecaseFactory {

    static create(): ChangeStockItemManagementTypeToAutoUsecaseInterface {
        
        const execute = async (input: ChangeStockItemManagementTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemManagementRepository = new PrismaStockItemManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemManagementTypeToAutoUsecase = new ChangeStockItemManagementTypeToAutoUsecase(
                    prismaStockItemManagementRepository,
                     outboxEmitter
                )
                return await changeStockItemManagementTypeToAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}