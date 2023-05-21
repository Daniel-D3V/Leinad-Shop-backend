import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import {  DeactivateCategoryUsecase } from "../application/usecases";;
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  DeactivateCategoryUsecaseInterface } from "../domain/usecases";

export class DeactivateCategoryFactory {

    static create(): DeactivateCategoryUsecaseInterface {
        
        const execute = async (input: DeactivateCategoryUsecaseInterface.InputDto): Promise<DeactivateCategoryUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deactivateCategoryUsecase = new DeactivateCategoryUsecase(prismaCategoryRepository, outboxEmitter)
                return await deactivateCategoryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}