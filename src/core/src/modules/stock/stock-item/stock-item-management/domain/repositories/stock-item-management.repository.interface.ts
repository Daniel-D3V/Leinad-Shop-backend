import { StockItemManagementEntity } from "../entities";

export interface StockItemManagementRepositoryInterface {
    create(stockItem: StockItemManagementEntity): Promise<void>
    findById(id: string): Promise<StockItemManagementEntity | null>
    findByAnnounceItemId(announceItemId: string): Promise<StockItemManagementEntity | null>
    update(stockItem: StockItemManagementEntity): Promise<void>
}