import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { CreateCategoryUsecase } from "../application/usecases";
import { CreateCategoryUsecaseInterface } from "../domain/usecases";
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";

export class CreateCategoryFactory {

    static create(): CreateCategoryUsecaseInterface {
        
        const execute = async (input: CreateCategoryUsecaseInterface.InputDto): Promise<CreateCategoryUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createCategoryUsecase = new CreateCategoryUsecase(prismaCategoryRepository, outboxEmitter)
                return await createCategoryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}