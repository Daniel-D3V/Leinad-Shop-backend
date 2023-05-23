import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import { AddAutoStockUsecaseInterface } from "@/modules/product-stock/domain/usecases"
import { AddAutoStockUsecase } from "@/modules/product-stock/application/usecases"
import { PrismaProductStockAutoRepository } from "@/modules/product-stock/infra/repositories"

export class AddAutoStockUsecaseFactory {

    static create(): AddAutoStockUsecaseInterface {

        const execute = async (input: AddAutoStockUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                
                const productStockAutoRepository = new PrismaProductStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const addAutoStockUsecase = new AddAutoStockUsecase( productStockAutoRepository, outboxEmitter)
                return await addAutoStockUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}