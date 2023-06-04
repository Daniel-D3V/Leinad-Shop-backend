
import { PrismaClient, StockNormalManual } from "@prisma/client";
import { StockNormalManualRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManualEntity } from "../../../domain/entities";


class PrismaStockManualMapper {

    static toDomain(prismaStockNormalManual: StockNormalManual): StockNormalManualEntity {
        const stockNormalManualEntity = StockNormalManualEntity.create({
            stock: prismaStockNormalManual.stock,
            stockNormalManagementId: prismaStockNormalManual.stockNormalManagementId
        }, prismaStockNormalManual.id)
        if (stockNormalManualEntity.isLeft()) throw stockNormalManualEntity.value[0]
        return stockNormalManualEntity.value
    }
}

export class PrismaStockNormalManualRepository implements StockNormalManualRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }
    async create(stockNormalManualEntity: StockNormalManualEntity): Promise<void> {
        await this.prismaClient.stockNormalManual.create({
            data: {
                ...stockNormalManualEntity.toJSON()
            }
        })
    }
    async findById(id: string): Promise<StockNormalManualEntity | null> {
        const prismaStockManual = await this.prismaClient.stockNormalManual.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockManual) return null
        return PrismaStockManualMapper.toDomain(prismaStockManual)
    }

    async findByStockNormalManagementId(stockNormalManagementId: string): Promise<StockNormalManualEntity | null> {
        const prismaStockManual = await this.prismaClient.stockNormalManual.findFirst({
            where: { stockNormalManagementId: stockNormalManagementId ?? "" }
        })
        if (!prismaStockManual) return null
        return PrismaStockManualMapper.toDomain(prismaStockManual)
    }

    async update(stockNormalManualEntity: StockNormalManualEntity): Promise<void> {
        await this.prismaClient.stockNormalManual.update({
            where: { id: stockNormalManualEntity.id ?? "" },
            data: {
                stock: stockNormalManualEntity.getCurrentStock()
            }
        })
    }


}