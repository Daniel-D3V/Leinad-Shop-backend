
export interface StockAutoGatewayInterface {
    getStockAutoCount(stockManagementId: string): Promise<number>
}