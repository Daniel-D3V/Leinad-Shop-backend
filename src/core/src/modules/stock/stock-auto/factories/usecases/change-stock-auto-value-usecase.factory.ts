

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeStockAutoValueUsecaseInterface } from "../../domain/usecases";
import { PrismaStockAutoRepository } from "../../infra/repositories";
import { ChangeStockAutoValueUsecase } from "../../application/usecases";


export class ChangeStockAutoValueUsecaseFactory {

    static create(): ChangeStockAutoValueUsecaseInterface {
        
        const execute = async (input: ChangeStockAutoValueUsecaseInterface.InputDto): Promise<ChangeStockAutoValueUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockAutoRepository = new PrismaStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockAutoValueUsecase = new ChangeStockAutoValueUsecase(prismaStockAutoRepository, outboxEmitter)
                return await changeStockAutoValueUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}