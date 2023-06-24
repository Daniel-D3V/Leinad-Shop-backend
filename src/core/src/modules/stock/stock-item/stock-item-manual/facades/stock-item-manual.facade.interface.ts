
export interface StockItemManualFacadeInterface {

    consultStockAvailability(announceItemId: string): Promise<number | null>
}