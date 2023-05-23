import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import {  ChangeProductStockTypeToManualUsecase } from "@/modules/product-stock/application/usecases"
import {   PrismaProductStockRepository } from "@/modules/product-stock/infra/repositories"
import {  ChangeProductStockTypeToManualUsecaseInterface } from "@/modules/product-stock/domain/usecases"

export class ChangeProductStockTypeToManualUsecaseFactory {

    static create(): ChangeProductStockTypeToManualUsecaseInterface {

        const execute = async (input: ChangeProductStockTypeToManualUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaProductStockRepository = new PrismaProductStockRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeProductStockTypeToManualUsecase= new ChangeProductStockTypeToManualUsecase( prismaProductStockRepository, outboxEmitter)
                return await changeProductStockTypeToManualUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}