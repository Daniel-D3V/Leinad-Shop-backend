
export interface StockNormalManualFacadeInterface {

    cosultStockAvailability(announceNormalId: string): Promise<number | null>
}