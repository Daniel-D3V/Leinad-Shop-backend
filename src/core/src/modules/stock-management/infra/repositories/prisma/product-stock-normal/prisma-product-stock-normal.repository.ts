import { ProductStockNormalEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockNormalRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaProductStockNormalRepository implements ProductStockNormalRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(productStockNormalEntity: ProductStockNormalEntity): Promise<void> {
        await this.prismaClient.productStockNormal.create({
            data: {
                ...productStockNormalEntity.toJSON(),
                announceId: productStockNormalEntity.id
            }
        })
    }

    async findById(id: string): Promise<ProductStockNormalEntity | null> {
        const prismaProductStockNormar = await this.prismaClient.productStockNormal.findFirst({
            where: { id: id ?? "" }
        }) 
        if(!prismaProductStockNormar) return null
        const productStockNormalEntity = ProductStockNormalEntity.create({
            stock: prismaProductStockNormar.stock
        }, prismaProductStockNormar.id)
        if(productStockNormalEntity.isLeft()) throw productStockNormalEntity.value
        return productStockNormalEntity.value
    }
    async update(productStockNormalEntity: ProductStockNormalEntity): Promise<void> {
        await this.prismaClient.productStockNormal.update({
            where: { id: productStockNormalEntity.id ?? "" },
            data: {
                stock: productStockNormalEntity.getCurrentStock()
            }
        })
    }

}