import { PrismaClient } from "@prisma/client";
import { StockItemAutoGatewayInterface } from "../../domain/gateways";

export class PrismaStockItemAutoGateway implements StockItemAutoGatewayInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async getStockItemAutoCount(stockItemId: string): Promise<number> {
        return await this.prismaClient.stockItemAuto.count({
            where: { stockItemId: stockItemId ?? "" }
        })
    }

}