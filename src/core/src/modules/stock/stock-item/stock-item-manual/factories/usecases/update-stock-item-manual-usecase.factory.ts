import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateStockItemManualUsecaseInterface, UpdateStockItemManualUsecaseInterface } from "../../domain/usecases";
import { PrismaStockItemManualRepository } from "../../infra/repositories";
import { CreateStockItemManualUsecase, UpdateStockItemManualUsecase } from "../../application/usecases";


export class UpdateStockItemManualUsecaseFactory {

    static create(): UpdateStockItemManualUsecaseInterface {
        
        const execute = async (input: UpdateStockItemManualUsecaseInterface.InputDto): Promise<UpdateStockItemManualUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemManualRepository = new PrismaStockItemManualRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateStockItemManualUsecase = new UpdateStockItemManualUsecase(
                    prismaStockItemManualRepository,
                     outboxEmitter
                )
                return await updateStockItemManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}