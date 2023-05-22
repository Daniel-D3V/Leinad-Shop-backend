import { ProductStockNormalEntity } from "../entities";

export interface ProductStockNormalRepositoryInterface {
    create(productStockNormalEntity: ProductStockNormalEntity): Promise<void>
    findById(id: string): Promise<ProductStockNormalEntity | null>
    update(productStockNormalEntity: ProductStockNormalEntity): Promise<void>
}