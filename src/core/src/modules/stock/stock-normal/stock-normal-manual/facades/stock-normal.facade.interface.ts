export interface StockNormalFacadeInterface {
    consultStockByAnnounceId(announceId: string): Promise<number> 
}