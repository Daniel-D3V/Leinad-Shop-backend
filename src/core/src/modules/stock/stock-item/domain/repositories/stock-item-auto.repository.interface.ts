import { StockItemAutoEntity } from "@/modules/stock/_base";

export interface StockItemAutoRepositoryInterface {

    create(stockItemAuto: StockItemAutoEntity): Promise<void>
}