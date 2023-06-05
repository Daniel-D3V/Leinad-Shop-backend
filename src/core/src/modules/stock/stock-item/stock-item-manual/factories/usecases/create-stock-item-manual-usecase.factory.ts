import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateStockItemManualUsecaseInterface } from "../../domain/usecases";
import { PrismaStockItemManualRepository } from "../../infra/repositories";
import { CreateStockItemManualUsecase } from "../../application/usecases";


export class CreateStockItemManualUsecaseFactory {

    static create(): CreateStockItemManualUsecaseInterface {
        
        const execute = async (input: CreateStockItemManualUsecaseInterface.InputDto): Promise<CreateStockItemManualUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemManualRepository = new PrismaStockItemManualRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createStockItemManualUsecase = new CreateStockItemManualUsecase(
                    prismaStockItemManualRepository,
                     outboxEmitter
                )
                return await createStockItemManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}