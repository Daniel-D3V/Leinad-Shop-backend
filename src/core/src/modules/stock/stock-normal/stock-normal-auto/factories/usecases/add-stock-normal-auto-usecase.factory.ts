

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  AddStockNormalAutoUsecaseInterface} from "../../domain/usecases";
import { AddStockNormalAutoUsecase } from "../../application/usecases";
import { PrismaStockNormalAutoRepository } from "../../infra/repositories";


export class AddStockNormalAutoUsecaseFactory {

    static create(): AddStockNormalAutoUsecaseInterface {
        
        const execute = async (input: AddStockNormalAutoUsecaseInterface.InputDto): Promise<AddStockNormalAutoUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalAutoRepository = new PrismaStockNormalAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const addStockNormalAutoUsecase = new AddStockNormalAutoUsecase(
                    prismaStockNormalAutoRepository,
                     outboxEmitter
                )
                return await addStockNormalAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}