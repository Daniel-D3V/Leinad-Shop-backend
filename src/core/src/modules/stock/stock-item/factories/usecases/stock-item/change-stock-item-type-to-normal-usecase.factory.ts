import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeStockItemTypeToNormalUsecaseInterface } from "../../../domain/usecases";
import { PrismaStockItemRepository } from "../../../infra/repositories";
import {  ChangeStockItemTypeToNormalUsecase} from "../../../application/usecases";

export class ChangeStockItemTypeToNormalUsecaseFactory {

    static create(): ChangeStockItemTypeToNormalUsecaseInterface {
        
        const execute = async (input: ChangeStockItemTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockItemTypeToNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemRepository = new PrismaStockItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemTypeToNormalUsecase = new ChangeStockItemTypeToNormalUsecase(prismaStockItemRepository, outboxEmitter)
                return await changeStockItemTypeToNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}