import { StockItemNormalEntity } from "@/modules/stock/_base";

export interface StockItemNormalRepositoryInterface {
    create(stockItem: StockItemNormalEntity): Promise<void>
    update(stockItem: StockItemNormalEntity): Promise<void>
    findById(id: string): Promise<StockItemNormalEntity | null>
    findByStockItemId(stockItemId: string): Promise<StockItemNormalEntity | null>
}