import { ProductStockGatewayInterface } from "@/modules/product-stock/domain/gateway";
import { PrismaClient } from "@prisma/client";

export class PrismaProductStockGateway implements ProductStockGatewayInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async getProductStockNormalCount(productStockId: string): Promise<number> {
        const stockCount =  await this.prismaClient.productStockNormal.findFirst({
            where: { id: productStockId  ?? ""}
        })
        return stockCount?.stock ?? 0
    }
   async getProductStockAutoCount(productStockId: string): Promise<number> {
        return await this.prismaClient.productStockAuto.count({
            where: { announceId: productStockId ?? ""}
        })
    }

}