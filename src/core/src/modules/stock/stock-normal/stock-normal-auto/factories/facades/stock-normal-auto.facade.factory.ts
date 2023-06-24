import { PrismaClient } from "@prisma/client";
import { StockNormalAutoFacadeInterface } from "../../facades";
import { StockNormalAutoFacade } from "../../infra/facades";
import { PrismaStockNormalAutoGateway } from "../../infra/gateways";

export class StockNormalAutoFacadeFactory {
    static create(prismaClient: PrismaClient): StockNormalAutoFacadeInterface {
        const prismaStockNormalAutoGateway = new PrismaStockNormalAutoGateway(prismaClient)
        const stockNormalAutoFacade = new StockNormalAutoFacade(prismaStockNormalAutoGateway)
        return stockNormalAutoFacade
    }
}