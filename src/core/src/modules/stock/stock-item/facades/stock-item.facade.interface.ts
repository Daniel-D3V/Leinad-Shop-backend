
export interface StockItemFacadeInterface {
    consultStock(announceId: string, itemId: string): Promise<number>
}
