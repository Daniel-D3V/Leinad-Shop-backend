export interface StockItemAutoFacadeInterface {

    cosultStockAvailability(announceItemId: string): Promise<number | null>
}

export namespace StockItemAutoFacadeInterface {

    
}