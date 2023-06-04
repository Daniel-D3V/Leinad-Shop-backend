import { PrismaClient } from "@prisma/client";
import { StockAutoGatewayInterface } from "../../../domain/gateways";


export class PrismaStockAutoGateway implements StockAutoGatewayInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async getStockAutoCount(stockManagementId: string): Promise<number> {
        return this.prismaClient.stockAuto.count({
            where: { stockManagementId: stockManagementId ?? "" }
        })
    }

}