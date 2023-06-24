import { PrismaClient, StockItemManual } from "@prisma/client";
import { StockItemManualEntity } from "../../../domain/entities";
import { StockItemManualRepositoryInterface } from "../../../domain/repositories";

class PrismaStockItemManualMapper {
    static toDomain(prismaStockItemManual: StockItemManual) {
        const stockItemManualEntity = StockItemManualEntity.create({
            ...prismaStockItemManual
        }, prismaStockItemManual.id)
        if(stockItemManualEntity.isLeft()) throw stockItemManualEntity.value[0]
        return stockItemManualEntity.value
    }
}

export class PrismaStockItemManualRepository implements StockItemManualRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(stockItemManualEntity: StockItemManualEntity): Promise<void> {
        await this.prismaClient.stockItemManual.create({
            data: {
                ...stockItemManualEntity.toJSON()
            }
        })
    }
    async findByAnnounceItemId(announceItemId: string): Promise<StockItemManualEntity | null> {
        const prismaStockItem = await this.prismaClient.stockItemManual.findFirst({
            where: { announceItemId: announceItemId ?? ""}
        })
        if(!prismaStockItem) return null
        return PrismaStockItemManualMapper.toDomain(prismaStockItem)
    }
    async findById(id: string): Promise<StockItemManualEntity | null> {
        const prismaStockItem = await this.prismaClient.stockItemManual.findFirst({
            where: { id: id ?? ""}
        })
        if(!prismaStockItem) return null
        return PrismaStockItemManualMapper.toDomain(prismaStockItem)
    }

    async update(stockItemManualEntity: StockItemManualEntity): Promise<void> {
        const { id, announceItemId, ...props } = stockItemManualEntity.toJSON()
        await this.prismaClient.stockItemManual.update({
            where: { id: stockItemManualEntity.id },
            data: {
                ...props
            }
        })
    }
}