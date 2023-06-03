
export interface StockItemFacadeInterface {
    consultStock(itemId: string): Promise<number>
}
