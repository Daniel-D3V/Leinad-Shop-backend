
export interface StockItemAutoGatewayInterface {

    cosultStockAvailability(announceNormalId: string): Promise<number | null>
}