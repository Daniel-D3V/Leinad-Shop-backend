
import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";
import { UpdateStockNormalManualUsecase } from "../../application/usecases";
import { PrismaStockNormalManualRepository } from "../../infra/repositories";
import { UpdateStockNormalManualUsecaseInterface } from "../../domain/usecases";

export class UpdateStockNormalManualUsecaseFactory {

    static create(): UpdateStockNormalManualUsecaseInterface {
        
        const execute = async (input: UpdateStockNormalManualUsecaseInterface.InputDto): Promise<UpdateStockNormalManualUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {

                const prismaStockNormalManualRepository = new PrismaStockNormalManualRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateStockNormalManualUsecase = new UpdateStockNormalManualUsecase(
                    prismaStockNormalManualRepository,
                     outboxEmitter
                )
                return await updateStockNormalManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}