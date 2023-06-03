import { StockItemNormalEntity } from "@/modules/stock/_base";
import { StockItemNormalRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { PrismaClient } from "@prisma/client";


export class PrismaStockItemNormalRepository implements StockItemNormalRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(stockItem: StockItemNormalEntity): Promise<void> {
        await this.prismaClient.stockItemNormal.create({
            data: {
                ...stockItem.toJSON()
            }
        })
    }
    async update(stockItem: StockItemNormalEntity): Promise<void> {
        const { id, stockItemId, ...props } = stockItem.toJSON()
        await this.prismaClient.stockItemNormal.update({
            where: { id: stockItem.id ?? ""},
            data: {
                ...props
            }
        })
    }
    async findById(id: string): Promise<StockItemNormalEntity | null> {
        const prismaStockItemNormal = await this.prismaClient.stockItemNormal.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaStockItemNormal) return null
        const stockItemNormalEntity = StockItemNormalEntity.create({
            ...prismaStockItemNormal
        }, prismaStockItemNormal.id)
        if(stockItemNormalEntity.isLeft()) throw stockItemNormalEntity.value[0]
        return stockItemNormalEntity.value
    }
    async findByStockItemId(stockItemId: string): Promise<StockItemNormalEntity | null> {
        const prismaStockItemNormal = await this.prismaClient.stockItemNormal.findFirst({
            where: { stockItemId: stockItemId ?? "" }
        })
        if(!prismaStockItemNormal) return null
        const stockItemNormalEntity = StockItemNormalEntity.create({
            ...prismaStockItemNormal
        }, prismaStockItemNormal.id)
        if(stockItemNormalEntity.isLeft()) throw stockItemNormalEntity.value[0]
        return stockItemNormalEntity.value
    }

}