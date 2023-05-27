

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockAutoValueUsecaseInterface, DeleteStockAutoUsecaseInterface } from "../../domain/usecases";
import { PrismaStockAutoRepository } from "../../infra/repositories";
import { ChangeStockAutoValueUsecase, DeleteStockAutoUsecase } from "../../application/usecases";


export class DeleteStockAutoUsecaseFactory {

    static create(): DeleteStockAutoUsecaseInterface {
        
        const execute = async (input: DeleteStockAutoUsecaseInterface.InputDto): Promise<DeleteStockAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockAutoRepository = new PrismaStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteStockAutoUsecase = new DeleteStockAutoUsecase(prismaStockAutoRepository, outboxEmitter)
                return await deleteStockAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}