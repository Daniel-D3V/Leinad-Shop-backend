import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import {  UpdateNormalStockUsecase } from "@/modules/product-stock/application/usecases"
import {  PrismaProductStockNormalRepository } from "@/modules/product-stock/infra/repositories"
import {  UpdateNormalStockUsecaseInterface } from "@/modules/product-stock/domain/usecases/normal"

export class UpdateNormalStockUsecaseFactory {

    static create(): UpdateNormalStockUsecaseInterface {

        const execute = async (input: UpdateNormalStockUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaProductStockNormalRepository = new PrismaProductStockNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const updateNormalStockUsecase = new UpdateNormalStockUsecase( prismaProductStockNormalRepository, outboxEmitter)
                return await updateNormalStockUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}