import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockItemPriceUsecaseInterface, ChangeStockItemTitleUsecaseInterface, ChangeStockItemTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { PrismaStockItemRepository } from "../../../infra/repositories";
import { ChangeStockItemPriceUsecase, ChangeStockItemTitleUsecase, ChangeStockItemTypeToAutoUsecase} from "../../../application/usecases";

export class ChangeStockItemTitleUsecaseFactory {

    static create(): ChangeStockItemTitleUsecaseInterface {
        
        const execute = async (input: ChangeStockItemTitleUsecaseInterface.InputDto): Promise<ChangeStockItemTitleUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemRepository = new PrismaStockItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemTitleUsecase = new ChangeStockItemTitleUsecase(prismaStockItemRepository, outboxEmitter)
                return await changeStockItemTitleUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}