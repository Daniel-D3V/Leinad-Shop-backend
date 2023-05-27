import { StockItemAutoEntity } from "@/modules/stock/_base";
import { StockItemAutoRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaStockItemAutoRepository implements StockItemAutoRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    create(stockItemAuto: StockItemAutoEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(stockItemAuto: StockItemAutoEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<StockItemAutoEntity | null> {
        throw new Error("Method not implemented.");
    }

}