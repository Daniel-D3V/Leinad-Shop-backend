export interface StockNormalAutoGatewayInterface {

    consultStockAvailability(announceNormalId: string): Promise<number | null>
}