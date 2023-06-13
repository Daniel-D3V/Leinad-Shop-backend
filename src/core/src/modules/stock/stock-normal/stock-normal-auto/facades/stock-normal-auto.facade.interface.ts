export interface StockNormalAutoFacadeInterface {

    pickOneAndDelete(stockItemId: string): Promise<StockNormalAutoFacadeInterface.FindByIdOutputDto>
}

export namespace StockNormalAutoFacadeInterface {

    type StockItemAuto = {
        id: string
        value: string
    }

    export type FindByIdOutputDto = StockItemAuto | null
}