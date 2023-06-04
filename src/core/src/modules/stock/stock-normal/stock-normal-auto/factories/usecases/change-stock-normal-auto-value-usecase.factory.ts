

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaStockNormalAutoRepository } from "../../infra/repositories";
import { ChangeStockNormalAutoValueUsecaseInterface } from "../../domain/usecases";
import { ChangeStockNormalAutoValueUsecase } from "../../application/usecases";


export class ChangeStockNormalAutoValueUsecaseFactory {

    static create(): ChangeStockNormalAutoValueUsecaseInterface {
        
        const execute = async (input: ChangeStockNormalAutoValueUsecaseInterface.InputDto): Promise<ChangeStockNormalAutoValueUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalAutoRepository = new PrismaStockNormalAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeStockNormalAutoValueUsecase = new ChangeStockNormalAutoValueUsecase(
                    prismaStockNormalAutoRepository,
                    outboxEmitter
                )
                return await changeStockNormalAutoValueUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}