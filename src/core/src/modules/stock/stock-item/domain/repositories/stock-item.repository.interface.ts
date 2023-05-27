import { StockItemEntity } from "../entities";

export interface StockItemRepositoryInterface {
    create(stockItem: StockItemEntity): Promise<void>
    findById(id: string): Promise<StockItemEntity | null>
    update(stockItem: StockItemEntity): Promise<void>
}