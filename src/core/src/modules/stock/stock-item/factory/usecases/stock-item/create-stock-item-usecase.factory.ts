import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateStockItemUsecaseInterface } from "../../../domain/usecases";
import { PrismaStockItemRepository } from "../../../infra/repositories";
import { CreateStockItemUsecase } from "../../../application/usecases";

export class CreateStockItemUsecaseFactory {

    static create(): CreateStockItemUsecaseInterface {
        
        const execute = async (input: CreateStockItemUsecaseInterface.InputDto): Promise<CreateStockItemUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemRepository = new PrismaStockItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createStockItemUsecase = new CreateStockItemUsecase(prismaStockItemRepository, outboxEmitter)
                return await createStockItemUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}