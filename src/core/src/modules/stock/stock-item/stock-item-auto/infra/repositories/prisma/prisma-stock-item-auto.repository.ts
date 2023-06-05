import { PrismaClient } from "@prisma/client";
import { StockItemAutoEntity } from "../../../domain/entities";
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories";


export class PrismaStockItemAutoRepository implements StockItemAutoRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(stockItemAutoEntity: StockItemAutoEntity): Promise<void> {
        await this.prismaClient.stockItemAuto.create({
            data: {
                ...stockItemAutoEntity.toJSON()
            }
        })
    }

}