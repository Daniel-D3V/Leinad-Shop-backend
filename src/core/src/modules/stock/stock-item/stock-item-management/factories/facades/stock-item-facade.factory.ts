import { PrismaClient } from "@prisma/client"
// import { ConsultStockItemAutoAvailabilityUsecase, ConsultStockItemAvailabilityUsecase, ConsultStockItemNormalAvailabilityUsecase } from "../../application/usecases"
import { StockItemFacadeInterface } from "../../facades"
// import { StockItemFacadeImp } from "../../infra/facades"
// import { PrismaStockItemNormalRepository, PrismaStockItemRepository } from "../../infra/repositories"
// import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
// import { PrismaStockItemAutoGateway } from "../../infra/gateways"

export class StockItemFacadeFactory {

    static create(providedPrisma: PrismaClient): StockItemFacadeInterface {
        // const usePrisma = providedPrisma ?? prismaClient

        // const prismaStockItemAutoGateway = new PrismaStockItemAutoGateway(usePrisma)
        // const consultStockItemAutoUsecase = new ConsultStockItemAutoAvailabilityUsecase(prismaStockItemAutoGateway)
        // const prismaStockItemNormalRepository = new PrismaStockItemNormalRepository(usePrisma)
        // const consultStockItemNormalAvailabilityUsecase = new ConsultStockItemNormalAvailabilityUsecase(prismaStockItemNormalRepository)
        // const prismaStockItemRepository = new PrismaStockItemRepository(usePrisma)
        // const consultStockItemAvailability = new ConsultStockItemAvailabilityUsecase(
        //     prismaStockItemRepository,
        //     consultStockItemNormalAvailabilityUsecase,
        //     consultStockItemAutoUsecase
        // )
        // const stockItemFacade = new StockItemFacadeImp(consultStockItemAvailability)
        // return stockItemFacade
        return "" as any
    }
}