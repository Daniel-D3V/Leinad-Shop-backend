import { PrismaClient } from "@prisma/client";
import { StockItemManualEntity } from "../../../domain/entities";
import { StockItemManualRepositoryInterface } from "../../../domain/repositories";

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
    findByStockItemManagementId(stockItemManagementId: string): Promise<StockItemManualEntity | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<StockItemManualEntity | null> {
        throw new Error("Method not implemented.");
    }

}