import { StockAutoEntity } from "../entities";

export interface StockAutoRepositoryInterface {
    findById(id: string): Promise<StockAutoEntity | null>
    create(stockAutoEntity: StockAutoEntity): Promise<void>
    delete(id: string): Promise<void>
    update(stockAutoEntity: StockAutoEntity): Promise<void>
}