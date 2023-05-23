import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import {  CreateProductStockNormalUsecase } from "@/modules/product-stock/application/usecases"
import { PrismaProductStockAutoRepository, PrismaProductStockNormalRepository, PrismaProductStockRepository } from "@/modules/product-stock/infra/repositories"
import { CreateProductStockNormalUsecaseInterface } from "@/modules/product-stock/domain/usecases/normal"

export class CreateProductStockNormalUsecaseFactory {

    static create(): CreateProductStockNormalUsecaseInterface {

        const execute = async (input: CreateProductStockNormalUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaProductStockRepository = new PrismaProductStockRepository(prisma as PrismaClient)
                const prismaProductStockNormalRepository = new PrismaProductStockNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createProductStockNormalUsecase = new CreateProductStockNormalUsecase( prismaProductStockRepository, prismaProductStockNormalRepository, outboxEmitter)
                return await createProductStockNormalUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}