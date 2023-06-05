import { PrismaClient } from "@prisma/client";
import { StockItemAutoEntity } from "../../../domain/entities";
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories";


export class PrismaStockItemAutoRepository implements StockItemAutoRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    async findById(id: string): Promise<StockItemAutoEntity | null> {
        const prismaStockItemAuto = await this.prismaClient.stockItemAuto.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaStockItemAuto) return null
        const stockItemAutoEntity = StockItemAutoEntity.create({
            ...prismaStockItemAuto
        }, prismaStockItemAuto.id)
        if(stockItemAutoEntity.isLeft()) throw stockItemAutoEntity.value[0]
        return stockItemAutoEntity.value
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.stockItemAuto.deleteMany({
            where: { id: id ?? "" }
        })
    }
    async update(stockItemAutoEntity: StockItemAutoEntity): Promise<void> {
        const { id, stockItemManagementId, ...props} = stockItemAutoEntity.toJSON()
        await this.prismaClient.stockItemAuto.updateMany({
            where: { id },
            data: {
                ...props
            }
        })
    }

    async create(stockItemAutoEntity: StockItemAutoEntity): Promise<void> {
        await this.prismaClient.stockItemAuto.create({
            data: {
                ...stockItemAutoEntity.toJSON()
            }
        })
    }

}