import { StockItemAutoEntity } from "../entities";

export interface StockItemAutoRepositoryInterface { 

    findById(id: string): Promise<StockItemAutoEntity | null>
    delete(id: string): Promise<void>
    update(stockItemAutoEntity: StockItemAutoEntity): Promise<void>
    create(stockItemAutoEntity: StockItemAutoEntity): Promise<void>
}