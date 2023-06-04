import { StockItemAutoEntity } from "../entities";

export interface StockItemAutoRepositoryInterface { 

    create(stockItemAutoEntity: StockItemAutoEntity): Promise<void>
    
}