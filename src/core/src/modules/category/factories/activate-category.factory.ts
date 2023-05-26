import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { ActivateCategoryUsecase } from "../application/usecases";;
import { PrismaCategoryRepository } from "../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ActivateCategoryUsecaseInterface } from "../domain/usecases";

export class ActivateCategoryFactory {

    static create(): ActivateCategoryUsecaseInterface {

        const execute = async (input: ActivateCategoryUsecaseInterface.InputDto): Promise<ActivateCategoryUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const activateCategoryUsecase = new ActivateCategoryUsecase(prismaCategoryRepository, outboxEmitter)
                return await activateCategoryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}