import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import { DeleteAutoStockUsecaseInterface } from "@/modules/stock/domain/usecases"
import { DeleteAutoStockUsecase } from "@/modules/stock/application/usecases"
import { PrismaProductStockAutoRepository } from "@/modules/stock/infra/repositories"

export class DeleteAutoStockUsecaseFactory {

    static create(): DeleteAutoStockUsecaseInterface {

        const execute = async (input: DeleteAutoStockUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const productStockAutoRepository = new PrismaProductStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteAutoStockUsecase = new DeleteAutoStockUsecase(productStockAutoRepository, outboxEmitter)
                return await deleteAutoStockUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}