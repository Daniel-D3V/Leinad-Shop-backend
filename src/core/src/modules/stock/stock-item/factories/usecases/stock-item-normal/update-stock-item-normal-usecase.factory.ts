import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {    UpdateStockItemNormalUsecaseInterface,  } from "../../../domain/usecases";
import { PrismaStockItemNormalRepository } from "../../../infra/repositories";
import {  UpdateStockItemNormalUsecase, } from "../../../application/usecases";

export class UpdateStockItemNormalUsecaseFactory {

    static create(): UpdateStockItemNormalUsecaseInterface {
        
        const execute = async (input: UpdateStockItemNormalUsecaseInterface.InputDto): Promise<UpdateStockItemNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemNormalRepository = new PrismaStockItemNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateStockItemNormalUsecase = new UpdateStockItemNormalUsecase(prismaStockItemNormalRepository, outboxEmitter)
                return await updateStockItemNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}