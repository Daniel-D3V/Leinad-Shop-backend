import { StockNormalEntity } from "../entities";

export interface StockNormalRepositoryInterface {
    create(stockNormalEntity: StockNormalEntity): Promise<void>
    findById(id: string): Promise<StockNormalEntity | null>
    findByAnnounceId(announceId: string): Promise<StockNormalEntity | null>
    update(stockNormalEntity: StockNormalEntity): Promise<void>
}