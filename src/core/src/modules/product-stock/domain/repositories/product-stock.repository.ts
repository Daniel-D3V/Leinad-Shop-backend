import { ProductStockEntity } from "../entities";

export interface ProductStockRepositoryInterface {
    findById(id: string): Promise<ProductStockEntity | null>
    update(productStockEntity: ProductStockEntity): Promise<void>
}