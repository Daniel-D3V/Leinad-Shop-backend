import { ProductStockEntity } from "../domain/entities";

export interface GetProductStockTypeFacadeInterface {
    execute(productId: string): Promise<ProductStockEntity.StockType | undefined>
} 