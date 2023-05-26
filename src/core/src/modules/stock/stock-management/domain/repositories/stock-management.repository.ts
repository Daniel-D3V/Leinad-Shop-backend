import { StockManagementEntity } from "../entities";

export interface StockManagementRepositoryInterface {
    findById(id: string): Promise<StockManagementEntity | null>
    update(stockEntity: StockManagementEntity): Promise<void>
}