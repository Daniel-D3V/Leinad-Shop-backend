import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import { ChangeAutoStockValueUsecaseInterface } from "@/modules/stock/domain/usecases"
import { ChangeAutoStockValueUsecase } from "@/modules/stock/application/usecases"
import { PrismaProductStockAutoRepository } from "@/modules/stock/infra/repositories"

export class ChangeAutoStockValueUsecaseFactory {

    static create(): ChangeAutoStockValueUsecaseInterface {

        const execute = async (input: ChangeAutoStockValueUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const productStockAutoRepository = new PrismaProductStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAutoStockValueUsecase = new ChangeAutoStockValueUsecase(productStockAutoRepository, outboxEmitter)
                return await changeAutoStockValueUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}