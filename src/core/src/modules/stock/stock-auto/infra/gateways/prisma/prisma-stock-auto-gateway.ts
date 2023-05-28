import { PrismaClient } from "@prisma/client";
import { StockAutoGatewayInterface } from "../../../domain/gateways";


export class PrismaStockAutoGateway implements StockAutoGatewayInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async getStockAutoCount(announceId: string): Promise<number> {
        return this.prismaClient.stockAuto.count({
            where: { announceId: announceId ?? "" }
        })
    }

}