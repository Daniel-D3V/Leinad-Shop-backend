

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaStockNormalAutoRepository } from "../../infra/repositories";
import { DeleteStockNormalAutoUsecaseInterface } from "../../domain/usecases";
import { DeleteStockNormalAutoUsecase } from "../../application/usecases";


export class DeleteStockNormalAutoUsecaseFactory {

    static create(): DeleteStockNormalAutoUsecaseInterface {
        
        const execute = async (input: DeleteStockNormalAutoUsecaseInterface.InputDto): Promise<DeleteStockNormalAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalAutoRepository = new PrismaStockNormalAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteStockNormalAutoUsecase = new DeleteStockNormalAutoUsecase(
                    prismaStockNormalAutoRepository,
                    outboxEmitter
                )
                return await deleteStockNormalAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}