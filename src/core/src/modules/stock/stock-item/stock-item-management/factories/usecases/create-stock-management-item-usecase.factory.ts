import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateStockItemManagementUsecaseInterface } from "../../domain/usecases";
import { CreateStockItemManagementUsecase } from "../../application/usecases";
import { PrismaStockItemManagementRepository } from "../../infra/repositories";

export class CreateStockItemManagementUsecaseFactory {

    static create(): CreateStockItemManagementUsecaseInterface {
        
        const execute = async (input: CreateStockItemManagementUsecaseInterface.InputDto): Promise<CreateStockItemManagementUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemManagementRepository = new PrismaStockItemManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createStockItemManagementUsecase = new CreateStockItemManagementUsecase(
                    prismaStockItemManagementRepository,
                     outboxEmitter
                )
                return await createStockItemManagementUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}