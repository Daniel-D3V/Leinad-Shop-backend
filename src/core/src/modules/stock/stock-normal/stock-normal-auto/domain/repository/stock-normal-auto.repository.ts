import { StockNormalAutoEntity } from "../entities";

export interface StockNormalAutoRepositoryInterface {
    findById(id: string): Promise<StockNormalAutoEntity | null>
    create(stockNormalAutoEntity: StockNormalAutoEntity): Promise<void>
    delete(id: string): Promise<void>
    update(stockNormalAutoEntity: StockNormalAutoEntity): Promise<void>
}