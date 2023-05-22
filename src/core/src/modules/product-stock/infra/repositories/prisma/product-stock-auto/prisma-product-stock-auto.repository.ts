import { ProductStockAutoEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaProductStockAutoRepository implements ProductStockAutoRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async findById(id: string): Promise<ProductStockAutoEntity | null> {
        const prismaproductStockAuto = await this.prismaClient.productStockAuto.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaproductStockAuto) return null

        const productStockAutoEntity = ProductStockAutoEntity.create({
            productStockId: prismaproductStockAuto.announceId,
            value: prismaproductStockAuto.value
        }, prismaproductStockAuto.id)
        if(productStockAutoEntity.isLeft()) throw productStockAutoEntity.value[0]
        return productStockAutoEntity.value
    }
    async create(productStockAutoEntity: ProductStockAutoEntity): Promise<void> {
        const { productStockId, ...props } = productStockAutoEntity.toJSON()
        await this.prismaClient.productStockAuto.create({
            data: {
                ...props,
                announceId: productStockId
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.productStockAuto.deleteMany({
            where: { id: id ?? "" }
        }) 
    }
    async update(productStockAutoEntity: ProductStockAutoEntity): Promise<void> {
        const { productStockId, ...props } = productStockAutoEntity.toJSON()
        await this.prismaClient.productStockAuto.updateMany({
            where: { id: productStockAutoEntity.id ?? "" },
            data: {
                ...props,
                announceId: productStockId
            }
        }) 
    }

}