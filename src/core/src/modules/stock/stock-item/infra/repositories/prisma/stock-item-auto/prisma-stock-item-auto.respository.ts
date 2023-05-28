import { StockItemAutoEntity } from "@/modules/stock/_base";
import { StockItemAutoRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaStockItemAutoRepository implements StockItemAutoRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(stockItemAuto: StockItemAutoEntity): Promise<void> {
        await this.prismaClient.stockItemAuto.create({
            data: {
                ...stockItemAuto.toJSON()
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.stockItemAuto.deleteMany({
            where: { id: id ?? ""}
        })
    }
    async update(stockItemAuto: StockItemAutoEntity): Promise<void> {
        const { id, stockItemId ,...props} = stockItemAuto.toJSON()
        await this.prismaClient.stockItemAuto.update({
            where: { id: stockItemAuto.id ?? ""},
            data: {
                ...props
            }
        })
    }
    async findById(id: string): Promise<StockItemAutoEntity | null> {
        const prismaStockItemAuto = await this.prismaClient.stockItemAuto.findFirst({
            where: { id: id ?? ""}
        })
        if(!prismaStockItemAuto) return null
        const stockItemAutoEntity = StockItemAutoEntity.create({
            ...prismaStockItemAuto
        }, prismaStockItemAuto.id)
        if(stockItemAutoEntity.isLeft()) throw stockItemAutoEntity.value[0]
        return stockItemAutoEntity.value
    }

}