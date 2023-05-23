import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import {  GetStockAvailabilityUsecase } from "@/modules/product-stock/application/usecases"
import {   PrismaProductStockRepository } from "@/modules/product-stock/infra/repositories"
import {  GetStockAvailabilityUsecaseInterface } from "@/modules/product-stock/domain/usecases"
import { PrismaProductStockGateway } from "@/modules/product-stock/infra/gateways"

export class GetStockAvailabilityUsecaseFactory {

    static create(): GetStockAvailabilityUsecaseInterface {

        const execute = async (input: GetStockAvailabilityUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaProductStockGateway = new PrismaProductStockGateway(prisma as PrismaClient)
                const prismaProductStockRepository = new PrismaProductStockRepository(prisma as PrismaClient)
                const getStockAvailabilityUsecase = new GetStockAvailabilityUsecase( prismaProductStockRepository, prismaProductStockGateway)
                return await getStockAvailabilityUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}