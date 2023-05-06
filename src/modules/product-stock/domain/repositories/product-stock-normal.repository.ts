import { ProductStockNormalEntity } from "../entities";

export interface ProductStockNormalRepositoryInterface {
    findById(id: string): Promise<ProductStockNormalEntity | null>
    update(productStockNormalEntity: ProductStockNormalEntity): Promise<void>
    
}