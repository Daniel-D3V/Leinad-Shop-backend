import { StockManualEntity } from "../entities";

export interface StockManualRepositoryInterface {
    create(stockManualEntity: StockManualEntity): Promise<void>
    findById(id: string): Promise<StockManualEntity | null>
    findByStockManagementId(announceId: string): Promise<StockManualEntity | null>
    update(stockManualEntity: StockManualEntity): Promise<void>
}