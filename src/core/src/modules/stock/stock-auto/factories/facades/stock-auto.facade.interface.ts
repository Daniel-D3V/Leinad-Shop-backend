import { PrismaClient } from "@prisma/client"
import { ConsultStockAutoAvailabilityUsecase } from "../../application/usecases"
import { StockAutoFacadeInterface } from "../../facades"
import { StockAutoFacadeImp } from "../../infra/facades"
import { PrismaStockAutoGateway } from "../../infra/gateways"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"

export class StockAutoFacadeFactory {

    static create(providedPrisma?: PrismaClient): StockAutoFacadeInterface {
        const usePrisma = providedPrisma ?? prismaClient
        const prismaStockAutoGateway = new PrismaStockAutoGateway(usePrisma)
        const consultStockAutoAvailabilityUsecase = new ConsultStockAutoAvailabilityUsecase(prismaStockAutoGateway)
        const stockAutoFacadeImp = new StockAutoFacadeImp(consultStockAutoAvailabilityUsecase)
        return stockAutoFacadeImp
    }
}