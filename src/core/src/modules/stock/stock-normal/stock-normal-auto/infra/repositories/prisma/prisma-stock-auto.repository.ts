import { PrismaClient, StockNormalAuto } from "@prisma/client";
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository";
import { StockNormalAutoEntity } from "../../../domain/entities";

export class PrismaStockNormalAutoRepository implements StockNormalAutoRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }

    async findById(id: string): Promise<StockNormalAutoEntity | null> {
        const prismaStockNormalAuto = await this.prismaClient.stockNormalAuto.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockNormalAuto) return null

        const stockNormalAutoEntity = StockNormalAutoEntity.create({
            stockNormalManagementId: prismaStockNormalAuto.stockNormalManagementId,
            value: prismaStockNormalAuto.value
        }, prismaStockNormalAuto.id)
        if (stockNormalAutoEntity.isLeft()) throw stockNormalAutoEntity.value[0]
        return stockNormalAutoEntity.value
    }
    async create(stockNormalAutoEntity: StockNormalAutoEntity): Promise<void> {
            await this.prismaClient.stockNormalAuto.create({
                data: {
                    ...stockNormalAutoEntity.toJSON()
                }
            })
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.stockNormalAuto.deleteMany({
            where: { id: id ?? "" }
        })
    }
    async update(stockNormalAutoEntity: StockNormalAutoEntity): Promise<void> {
        await this.prismaClient.stockNormalAuto.updateMany({
            where: { id: stockNormalAutoEntity.id ?? "" },
            data: {
                ...stockNormalAutoEntity.toJSON()
            }
        })
    }

  
}