import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { StockManagementFacadeInterface } from "../../facades"
import { StockManagementFacadeImp } from "../../infra/facades"
import { PrismaStockManagementRepository } from "../../infra/repositories/prisma/prisma-stock-management.repository"
import { StockNormalFacadeFactory } from "@/modules/stock/stock-normal/factories"
import { StockAutoFacadeFactory } from "@/modules/stock/stock-auto/factories"
import { StockItemFacadeFactory } from "@/modules/stock/stock-item/factories"


export class StockManagementFacadeFactory {

    static create(): StockManagementFacadeInterface {
        const stockItemFacadeFactory = StockItemFacadeFactory.create(prismaClient)
        const stockAutoFacadeFactory = StockAutoFacadeFactory.create(prismaClient)
        const prismaStockManagementRepository = new PrismaStockManagementRepository(prismaClient)
        const stockNormalFacadeFactory = StockNormalFacadeFactory.create(prismaClient)
        const stockManagementFacade = new StockManagementFacadeImp(
            prismaStockManagementRepository,
            stockNormalFacadeFactory,
            stockAutoFacadeFactory,
            stockItemFacadeFactory
        )
        return stockManagementFacade
    }
}