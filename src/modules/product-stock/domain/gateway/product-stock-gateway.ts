export interface ProductStockGatewayInterface {
    getProductStockNormalCount(productStockId: string): Promise<number>
    getProductStockAutoCount(productStockId: string): Promise<number>
}