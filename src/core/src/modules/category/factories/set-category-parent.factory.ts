import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { SetCategoryParentUsecase } from "../application/usecases";;
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { SetCategoryParentUsecaseInterface } from "../domain/usecases";

export class SetCategoryParentFactory {

    static create(): SetCategoryParentUsecaseInterface {
        
        const execute = async (input: SetCategoryParentUsecaseInterface.InputDto): Promise<SetCategoryParentUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const setCategoryParentUsecase = new SetCategoryParentUsecase(prismaCategoryRepository, outboxEmitter)
                return await setCategoryParentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}