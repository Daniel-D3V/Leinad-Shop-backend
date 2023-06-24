import { PrismaClient } from "@prisma/client";
import { StockItemAutoGatewayInterface } from "../../domain/gateways";
import { StockItemAutoFacadeImp } from "../../infra/facades";
import { PrismaStockItemAutoGateway } from "../../infra/gateways";

export class StockItemAutoFacadeFactory {

    static create(prismaClient: PrismaClient): StockItemAutoGatewayInterface {

        const prismaStockItemAutoGateway = new PrismaStockItemAutoGateway(prismaClient)
        const stockItemAutoFacadeImp = new StockItemAutoFacadeImp(prismaStockItemAutoGateway) 
        return stockItemAutoFacadeImp
    }
}