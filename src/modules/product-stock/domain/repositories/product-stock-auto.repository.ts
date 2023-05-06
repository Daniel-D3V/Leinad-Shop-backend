import { ProductStockAutoEntity } from "../entities";

export interface ProductStockAutoRepositoryInterface {
    findById(id: string): Promise<ProductStockAutoEntity | null>
    create(productStockAutoEntity: ProductStockAutoEntity): Promise<void>
}