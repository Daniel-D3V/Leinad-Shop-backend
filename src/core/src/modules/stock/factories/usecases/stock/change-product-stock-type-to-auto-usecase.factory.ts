import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import { ChangeProductStockTypeToAutoUsecase } from "@/modules/stock/application/usecases"
import { PrismaProductStockRepository } from "@/modules/stock/infra/repositories"
import { ChangeProductStockTypeToAutoUsecaseInterface } from "@/modules/stock/domain/usecases"

export class ChangeProductStockTypeToAutoUsecaseFactory {

    static create(): ChangeProductStockTypeToAutoUsecaseInterface {

        const execute = async (input: ChangeProductStockTypeToAutoUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaProductStockRepository = new PrismaProductStockRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeProductStockTypeToAutoUsecase = new ChangeProductStockTypeToAutoUsecase(prismaProductStockRepository, outboxEmitter)
                return await changeProductStockTypeToAutoUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}