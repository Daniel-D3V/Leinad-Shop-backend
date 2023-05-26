
import { PrismaClient } from "@prisma/client";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { StockNormalEntity } from "../../../domain/entities";

export class PrismaStockNormalRepository implements StockNormalRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }
    async create(stockNormalEntity: StockNormalEntity): Promise<void> {
        await this.prismaClient.stockNormal.create({
            data: {
                ...stockNormalEntity.toJSON()
            }
        })
    }
    async findById(id: string): Promise<StockNormalEntity | null> {
        const prismaStockNormal = await this.prismaClient.stockNormal.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockNormal) return null
        const productStockNormalEntity = StockNormalEntity.create({
            stock: prismaStockNormal.stock,
            announceId: prismaStockNormal.announceId
        }, prismaStockNormal.id)
        if (productStockNormalEntity.isLeft()) throw productStockNormalEntity.value
        return productStockNormalEntity.value
    }

    async findByAnnounceId(announceId: string): Promise<StockNormalEntity | null> {
        const prismaStockNormal = await this.prismaClient.stockNormal.findFirst({
            where: { announceId: announceId ?? "" }
        })
        if (!prismaStockNormal) return null
        const productStockNormalEntity = StockNormalEntity.create({
            stock: prismaStockNormal.stock,
            announceId: prismaStockNormal.announceId
        }, prismaStockNormal.id)
        if (productStockNormalEntity.isLeft()) throw productStockNormalEntity.value
        return productStockNormalEntity.value
    }

    async update(stockNormalEntity: StockNormalEntity): Promise<void> {
        await this.prismaClient.stockNormal.update({
            where: { id: stockNormalEntity.id ?? "" },
            data: {
                stock: stockNormalEntity.getCurrentStock()
            }
        })
    }

  

}