
export interface StockManagementFacadeInterface {
    consultStock(props: StockManagementFacadeInterface.ConsultStockInput): Promise<number>
}

export namespace StockManagementFacadeInterface {

    export type ConsultStockInput = {
        announceId: string
        itemId?: string
    }
}
