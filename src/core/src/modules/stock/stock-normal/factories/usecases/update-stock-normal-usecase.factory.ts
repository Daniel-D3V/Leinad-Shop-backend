
import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { UpdateStockNormalUsecaseInterface } from "../../domain/usecases";
import { PrismaStockNormalRepository } from "../../infra/repositories";
import { UpdateStockNormalUsecase } from "../../application/usecases";

export class UpdateStockNormalUsecaseFactory {

    static create(): UpdateStockNormalUsecaseInterface {
        
        const execute = async (input: UpdateStockNormalUsecaseInterface.InputDto): Promise<UpdateStockNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalRepository = new PrismaStockNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateStockNormalUsecase = new UpdateStockNormalUsecase(prismaStockNormalRepository, outboxEmitter)
                return await updateStockNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}