import { PrismaClient } from "@prisma/client";
import { StockNormalManualFacadeInterface } from "../../facades";
import { PrismaStockNormalManualRepository } from "../../infra/repositories";
import { StockNormalManualFacadeImp } from "../../infra/repositories/facades";

export class StockNormalManualFacadeFactory {

    static create(prismaClient: PrismaClient): StockNormalManualFacadeInterface {

        const prismaStockNormalManualRepository = new PrismaStockNormalManualRepository(prismaClient)
        const stockNormalManualFacadeImp = new StockNormalManualFacadeImp(prismaStockNormalManualRepository)
        return stockNormalManualFacadeImp
    }
}