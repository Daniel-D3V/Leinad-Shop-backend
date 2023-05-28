import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockItemPriceUsecaseInterface, ChangeStockItemTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { PrismaStockItemRepository } from "../../../infra/repositories";
import { ChangeStockItemPriceUsecase, ChangeStockItemTypeToAutoUsecase} from "../../../application/usecases";

export class ChangeStockItemPriceUsecaseFactory {

    static create(): ChangeStockItemPriceUsecaseInterface {
        
        const execute = async (input: ChangeStockItemPriceUsecaseInterface.InputDto): Promise<ChangeStockItemPriceUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemRepository = new PrismaStockItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemPriceUsecase = new ChangeStockItemPriceUsecase(prismaStockItemRepository, outboxEmitter)
                return await changeStockItemPriceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}