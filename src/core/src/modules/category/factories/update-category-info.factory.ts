import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { UpdateCategoryInfoUsecase } from "../application/usecases";;
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import {  UpdateCategoryInfoUsecaseInterface } from "../domain/usecases";

export class UpdateCategoryInfoFactory {

    static create(): UpdateCategoryInfoUsecaseInterface {
        
        const execute = async (input: UpdateCategoryInfoUsecaseInterface.InputDto): Promise<UpdateCategoryInfoUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateCategoryInfoUsecase = new UpdateCategoryInfoUsecase(prismaCategoryRepository, outboxEmitter)
                return await updateCategoryInfoUsecase.execute(input)
            })
        }
        
        return {
            execute
        }
    }
}