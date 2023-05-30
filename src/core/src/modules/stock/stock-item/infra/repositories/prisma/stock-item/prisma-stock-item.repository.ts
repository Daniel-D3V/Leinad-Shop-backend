import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaStockItemRepository implements StockItemRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    async findByAnnounceItemId(announceItemId: string): Promise<StockItemEntity | null> {
        const prismaStockItem = await this.prismaClient.stockItem.findFirst({
            where: { announceItemId: announceItemId ?? "" }
        })
        if(!prismaStockItem) return null
        const stockItemEntity = StockItemEntity.create({
            ...prismaStockItem
        }, prismaStockItem.id)
        if(stockItemEntity.isLeft()) throw stockItemEntity.value[0]
        if(prismaStockItem.stockItemType === "AUTO") stockItemEntity.value.changeToTypeAuto()
        if(prismaStockItem.stockItemType === "NORMAL") stockItemEntity.value.changeToTypeNormal()
        return stockItemEntity.value
    }

    async create(stockItem: StockItemEntity): Promise<void> {
        await this.prismaClient.stockItem.create({
            data: {
                ...stockItem.toJSON()
            }
        })
    }
    
    async findById(id: string): Promise<StockItemEntity | null> {
        const prismaStockItem = await this.prismaClient.stockItem.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaStockItem) return null
        const stockItemEntity = StockItemEntity.create({
            ...prismaStockItem
        }, prismaStockItem.id)
        if(stockItemEntity.isLeft()) throw stockItemEntity.value[0]
        if(prismaStockItem.stockItemType === "AUTO") stockItemEntity.value.changeToTypeAuto()
        if(prismaStockItem.stockItemType === "NORMAL") stockItemEntity.value.changeToTypeNormal()
        return stockItemEntity.value
    }

    async update(stockItem: StockItemEntity): Promise<void> {
        const { id, announceItemId, ...props } = stockItem.toJSON()
        await this.prismaClient.stockItem.updateMany({
            where: { id: stockItem.id ?? "" },
            data: {
                ...props
            }
        })
    }
    
}