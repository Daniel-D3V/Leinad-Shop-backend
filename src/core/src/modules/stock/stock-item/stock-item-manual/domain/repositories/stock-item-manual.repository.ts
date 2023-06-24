import { StockItemManualEntity } from "../entities";

export interface StockItemManualRepositoryInterface {

    create(stockItemManualEntity: StockItemManualEntity): Promise<void>
    findByAnnounceItemId(announceItemId: string): Promise<StockItemManualEntity | null>
    findById(id: string): Promise<StockItemManualEntity | null>
    update(stockItemManualEntity: StockItemManualEntity): Promise<void>
}