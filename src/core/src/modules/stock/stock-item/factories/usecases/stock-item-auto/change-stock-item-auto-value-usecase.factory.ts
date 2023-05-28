import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  ChangeStockItemAutoValueUsecaseInterface,  } from "../../../domain/usecases";
import { PrismaStockItemAutoRepository } from "../../../infra/repositories";
import { ChangeStockItemAutoValueUsecase, } from "../../../application/usecases";

export class ChangeStockItemAutoValueUsecaseFactory {

    static create(): ChangeStockItemAutoValueUsecaseInterface {
        
        const execute = async (input: ChangeStockItemAutoValueUsecaseInterface.InputDto): Promise<ChangeStockItemAutoValueUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockItemAutoRepository = new PrismaStockItemAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockItemAutoValueUsecase = new ChangeStockItemAutoValueUsecase(prismaStockItemAutoRepository, outboxEmitter)
                return await changeStockItemAutoValueUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}