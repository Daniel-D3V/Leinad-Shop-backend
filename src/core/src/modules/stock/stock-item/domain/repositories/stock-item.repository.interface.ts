import { StockItemEntity } from "../entities";

export interface StockItemRepositoryInterface {
    create(stockItem: StockItemEntity): Promise<void>
}