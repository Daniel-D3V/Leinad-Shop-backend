import { ProductStockEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaProductStockRepository implements ProductStockRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient 
    ){}

    findById(id: string): Promise<ProductStockEntity | null> {
        throw new Error("Method not implemented.");
    }
    update(productStockEntity: ProductStockEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}