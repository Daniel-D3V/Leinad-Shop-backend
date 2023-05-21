import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import {  DeactivateCategoryUsecase, DeleteCategoryUsecase } from "../application/usecases";;
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  DeleteCategoryUsecaseInterface } from "../domain/usecases";

export class DeleteCategoryFactory {

    static create(): DeleteCategoryUsecaseInterface {
        
        const execute = async (input: DeleteCategoryUsecaseInterface.InputDto): Promise<DeleteCategoryUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteCategoryUsecase = new DeleteCategoryUsecase(prismaCategoryRepository, outboxEmitter)
                return await deleteCategoryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}