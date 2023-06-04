import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  CreateStockNormalManagementUsecaseInterface } from "../../domain/usecases";
import { CreateStockNormalManagementUsecase } from "../../application/usecases";
import { PrismaStockNormalManagementRepository } from "../../infra/repositories";

export class CreateStockNormalManagementUsecaseFactory {

    static create(): CreateStockNormalManagementUsecaseInterface {
        
        const execute = async (input: CreateStockNormalManagementUsecaseInterface.InputDto): Promise<CreateStockNormalManagementUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaStockNormalManagementRepository = new PrismaStockNormalManagementRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createStockNormalManagementUsecase = new CreateStockNormalManagementUsecase(
                    prismaStockNormalManagementRepository,
                     outboxEmitter
                )
                return await createStockNormalManagementUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}