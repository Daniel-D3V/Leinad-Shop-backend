import { PrismaClient } from "@prisma/client";
import { StockItemManualFacadeInterface } from "../../facades";
import { StockItemManualFacadeImp } from "../../infra/facades";
import { PrismaStockItemManualRepository } from "../../infra/repositories";


export class StockItemManualFacadeFactory {

    static create(prismaClient: PrismaClient): StockItemManualFacadeInterface {
        const prismaStockItemManualRepository = new PrismaStockItemManualRepository(prismaClient)
        const stockItemManualFacadeImp = new StockItemManualFacadeImp(prismaStockItemManualRepository)
        return stockItemManualFacadeImp
    }
}