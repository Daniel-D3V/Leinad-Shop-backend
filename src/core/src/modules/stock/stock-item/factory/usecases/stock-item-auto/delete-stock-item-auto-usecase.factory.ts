import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { DeleteStockItemAutoUsecaseInterface,  } from "../../../domain/usecases";
import { PrismaStockItemAutoRepository } from "../../../infra/repositories";
import {  DeleteStockItemAutoUsecase, } from "../../../application/usecases";

export class DeleteStockItemAutoUsecaseFactory {

    static create(): DeleteStockItemAutoUsecaseInterface {
        
        const execute = async (input: DeleteStockItemAutoUsecaseInterface.InputDto): Promise<DeleteStockItemAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemAutoRepository = new PrismaStockItemAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteStockItemAutoUsecase = new DeleteStockItemAutoUsecase(prismaStockItemAutoRepository, outboxEmitter)
                return await deleteStockItemAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}