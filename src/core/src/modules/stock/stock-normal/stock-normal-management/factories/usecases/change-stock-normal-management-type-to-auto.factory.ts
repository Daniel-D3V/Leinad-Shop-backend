import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaStockNormalManagementRepository } from "../../infra/repositories";
import { ChangeStockNormalManagementTypeToAutoUsecaseInterface } from "../../domain/usecases";
import { ChangeStockNormalManagementTypeToAutoUsecase } from "../../application/usecases";

export class ChangeStockNormalManagementTypeToAutoUsecaseFactory {

    static create(): ChangeStockNormalManagementTypeToAutoUsecaseInterface {
        
        const execute = async (input: ChangeStockNormalManagementTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalManagementRepository = new PrismaStockNormalManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockNormalManagementTypeToAutoUsecase = new ChangeStockNormalManagementTypeToAutoUsecase(
                    prismaStockNormalManagementRepository,
                     outboxEmitter
                    )
                return await changeStockNormalManagementTypeToAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}