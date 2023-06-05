import { StockItemManualEntity } from "../entities";

export interface StockItemManualRepositoryInterface {

    create(stockItemManualEntity: StockItemManualEntity): Promise<void>
    findByStockItemManagementId(stockItemManagementId: string): Promise<StockItemManualEntity | null>
    findById(id: string): Promise<StockItemManualEntity | null>
    update(stockItemManualEntity: StockItemManualEntity): Promise<void>
}