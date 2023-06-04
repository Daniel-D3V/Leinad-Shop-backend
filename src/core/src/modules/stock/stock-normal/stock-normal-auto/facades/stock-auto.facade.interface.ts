
export interface StockAutoFacadeInterface {
    consultStockByAnnounceId(announceId: string): Promise<number>
}
