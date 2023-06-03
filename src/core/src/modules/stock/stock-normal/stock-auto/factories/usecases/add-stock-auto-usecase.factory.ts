

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { AddStockAutoUsecaseInterface } from "../../domain/usecases";
import { PrismaStockAutoRepository } from "../../infra/repositories";
import { AddStockAutoUsecase } from "../../application/usecases";


export class AddStockAutoUsecaseFactory {

    static create(): AddStockAutoUsecaseInterface {
        
        const execute = async (input: AddStockAutoUsecaseInterface.InputDto): Promise<AddStockAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockAutoRepository = new PrismaStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const addStockAutoUsecase = new AddStockAutoUsecase(prismaStockAutoRepository, outboxEmitter)
                return await addStockAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}