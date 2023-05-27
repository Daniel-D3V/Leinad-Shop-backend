import { StockItemAutoEntity } from "@/modules/stock/_base";

export interface StockItemAutoRepositoryInterface {

    create(stockItemAuto: StockItemAutoEntity): Promise<void>
    delete(id: string): Promise<void>
    update(stockItemAuto: StockItemAutoEntity): Promise<void>
    findById(id: string): Promise<StockItemAutoEntity | null>
}