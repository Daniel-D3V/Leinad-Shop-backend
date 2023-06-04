
import { PrismaClient, StockManual } from "@prisma/client";
import { StockManualRepositoryInterface } from "../../../domain/repositories";
import { StockManualEntity } from "../../../domain/entities";


class PrismaStockManualMapper {

    static toDomain(prismaStockManual: StockManual): StockManualEntity {
        const stockManualEntity = StockManualEntity.create({
            stock: prismaStockManual.stock,
            stockManagementId: prismaStockManual.stockManagementId
        }, prismaStockManual.id)
        if (stockManualEntity.isLeft()) throw stockManualEntity.value[0]
        return stockManualEntity.value
    }
}

export class PrismaStockManualRepository implements StockManualRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }
    async create(stockManualEntity: StockManualEntity): Promise<void> {
        await this.prismaClient.stockManual.create({
            data: {
                ...stockManualEntity.toJSON()
            }
        })
    }
    async findById(id: string): Promise<StockManualEntity | null> {
        const prismaStockManual = await this.prismaClient.stockManual.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockManual) return null
        return PrismaStockManualMapper.toDomain(prismaStockManual)
    }

    async findByStockManagementId(stockManagementId: string): Promise<StockManualEntity | null> {
        const prismaStockManual = await this.prismaClient.stockManual.findFirst({
            where: { stockManagementId: stockManagementId ?? "" }
        })
        if (!prismaStockManual) return null
        return PrismaStockManualMapper.toDomain(prismaStockManual)
    }

    async update(stockManualEntity: StockManualEntity): Promise<void> {
        await this.prismaClient.stockManual.update({
            where: { id: stockManualEntity.id ?? "" },
            data: {
                stock: stockManualEntity.getCurrentStock()
            }
        })
    }


}