import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { RemoveCategoryParentUsecase } from "../application/usecases";;
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  RemoveCategoryParentUsecaseInterface } from "../domain/usecases";

export class RemoveCategoryParentFactory {

    static create(): RemoveCategoryParentUsecaseInterface {
        
        const execute = async (input: RemoveCategoryParentUsecaseInterface.InputDto): Promise<RemoveCategoryParentUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const removeCategoryParentUsecase = new RemoveCategoryParentUsecase(prismaCategoryRepository, outboxEmitter)
                return await removeCategoryParentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}