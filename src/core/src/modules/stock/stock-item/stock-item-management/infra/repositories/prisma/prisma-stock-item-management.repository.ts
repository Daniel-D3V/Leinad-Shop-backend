
import { PrismaClient, StockItemManagement } from "@prisma/client";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { StockItemManagementEntity } from "../../../domain/entities";

class PrismaStockItemManagementMapper {
    static toDomain(prismaStockItemManagement: StockItemManagement): StockItemManagementEntity {
        const stockItemEntity = StockItemManagementEntity.create({
            ...prismaStockItemManagement
        }, prismaStockItemManagement.id)
        if(stockItemEntity.isLeft()) throw stockItemEntity.value[0]
        if(prismaStockItemManagement.stockItemType === "AUTO") stockItemEntity.value.changeToTypeAuto()
        if(prismaStockItemManagement.stockItemType === "Manual") stockItemEntity.value.changeToTypeManual()
        return stockItemEntity.value
    }
}

export class PrismaStockItemManagementRepository implements StockItemManagementRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    async findByAnnounceItemId(announceItemId: string): Promise<StockItemManagementEntity | null> {
        const prismaStockItem = await this.prismaClient.stockItemManagement.findFirst({
            where: { announceItemId: announceItemId ?? "" }
        })
        if(!prismaStockItem) return null
        return PrismaStockItemManagementMapper.toDomain(prismaStockItem)
    }

    async create(stockItem: StockItemManagementEntity): Promise<void> {
        await this.prismaClient.stockItemManagement.create({
            data: {
                ...stockItem.toJSON()
            }
        })
    }
    
    async findById(id: string): Promise<StockItemManagementEntity | null> {
        const prismaStockItem = await this.prismaClient.stockItemManagement.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaStockItem) return null
        return PrismaStockItemManagementMapper.toDomain(prismaStockItem)
    }

    async update(stockItem: StockItemManagementEntity): Promise<void> {
        const { id, announceItemId, ...props } = stockItem.toJSON()
        await this.prismaClient.stockItemManagement.updateMany({
            where: { id: stockItem.id ?? "" },
            data: {
                ...props
            }
        })
    }
    
}