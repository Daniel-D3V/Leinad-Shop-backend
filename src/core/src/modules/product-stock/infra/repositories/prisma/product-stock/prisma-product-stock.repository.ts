import { ProductStockEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaProductStockRepository implements ProductStockRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient 
    ){}

    async findById(id: string): Promise<ProductStockEntity | null> {
        const prismaProductStock = await this.prismaClient.announce.findFirst({
            where: { id: id ?? ""}
        })
        if(!prismaProductStock) return null
        const productStockEntity = ProductStockEntity.create(prismaProductStock.id)
        if(prismaProductStock.stockType === "AUTO") productStockEntity.toStockAuto()
        if(prismaProductStock.stockType === "NORMAL") productStockEntity.toStockNormal()
        return productStockEntity
    }
    update(productStockEntity: ProductStockEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}