
import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";
import { CreateStockNormalManualUsecaseInterface } from "../../domain/usecases";
import { PrismaStockNormalManualRepository } from "../../infra/repositories";
import { CreateStockNormalManualUsecase } from "../../application/usecases";

export class CreateStockNormalManualUsecaseFactory {

    static create(): CreateStockNormalManualUsecaseInterface {
        
        const execute = async (input: CreateStockNormalManualUsecaseInterface.InputDto): Promise<CreateStockNormalManualUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {

                const prismaStockNormalManualRepository = new PrismaStockNormalManualRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createStockNormalManualUsecase = new CreateStockNormalManualUsecase(
                    prismaStockNormalManualRepository,
                     outboxEmitter
                )
                return await createStockNormalManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}