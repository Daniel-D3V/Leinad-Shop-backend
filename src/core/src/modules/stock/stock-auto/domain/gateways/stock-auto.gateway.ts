
export interface StockAutoGatewayInterface {
    getStockAutoCount(announceId: string): Promise<number>
}