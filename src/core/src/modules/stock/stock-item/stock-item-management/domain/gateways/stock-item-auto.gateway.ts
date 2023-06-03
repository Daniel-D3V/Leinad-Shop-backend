export interface StockItemAutoGatewayInterface {
    getStockItemAutoCount(stockItemId: string): Promise<number>
}