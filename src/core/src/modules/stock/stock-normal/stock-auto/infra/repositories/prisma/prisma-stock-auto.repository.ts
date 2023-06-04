import { PrismaClient } from "@prisma/client";
import { StockAutoRepositoryInterface } from "../../../domain/repository";
import { StockAutoEntity } from "../../../domain/entities";

export class PrismaStockAutoRepository implements StockAutoRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }

    async findById(id: string): Promise<StockAutoEntity | null> {
        const prismaStockAuto = await this.prismaClient.stockAuto.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockAuto) return null

        const stockAutoEntity = StockAutoEntity.create({
            stockManagementId: prismaStockAuto.stockManagementId,
            value: prismaStockAuto.value
        }, prismaStockAuto.id)
        if (stockAutoEntity.isLeft()) throw stockAutoEntity.value[0]
        return stockAutoEntity.value
    }
    async create(stockAutoEntity: StockAutoEntity): Promise<void> {
            await this.prismaClient.stockAuto.create({
                data: {
                    ...stockAutoEntity.toJSON()
                }
            })
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.stockAuto.deleteMany({
            where: { id: id ?? "" }
        })
    }
    async update(stockAutoEntity: StockAutoEntity): Promise<void> {
        await this.prismaClient.stockAuto.updateMany({
            where: { id: stockAutoEntity.id ?? "" },
            data: {
                ...stockAutoEntity.toJSON()
            }
        })
    }

  
}