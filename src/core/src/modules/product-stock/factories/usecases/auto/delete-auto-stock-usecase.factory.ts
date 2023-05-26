import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import {  DeleteAutoStockUsecaseInterface } from "@/modules/product-stock/domain/usecases"
import {  DeleteAutoStockUsecase } from "@/modules/product-stock/application/usecases"
import { PrismaProductStockAutoRepository } from "@/modules/product-stock/infra/repositories"

export class DeleteAutoStockUsecaseFactory {

    static create(): DeleteAutoStockUsecaseInterface {

        const execute = async (input: DeleteAutoStockUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const productStockAutoRepository = new PrismaProductStockAutoRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deleteAutoStockUsecase = new DeleteAutoStockUsecase( productStockAutoRepository, outboxEmitter)
                return await deleteAutoStockUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}