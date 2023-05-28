export interface StockNormalFacadeInterface {
    consultStock(announceId: string): Promise<number> 
}