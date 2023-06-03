import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockItemTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { PrismaStockItemRepository } from "../../../infra/repositories";
import { ChangeStockItemTypeToAutoUsecase} from "../../../application/usecases";

export class ChangeStockItemTypeToAutoUsecaseFactory {

    static create(): ChangeStockItemTypeToAutoUsecaseInterface {
        
        const execute = async (input: ChangeStockItemTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockItemTypeToAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemRepository = new PrismaStockItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemTypeToAutoUsecase = new ChangeStockItemTypeToAutoUsecase(prismaStockItemRepository, outboxEmitter)
                return await changeStockItemTypeToAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}