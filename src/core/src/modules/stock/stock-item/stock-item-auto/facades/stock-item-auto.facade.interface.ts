export interface StockItemAutoFacadeInterface {

    pickOneAndDelete(stockItemId: string): Promise<StockItemAutoFacadeInterface.FindByIdOutputDto>
}

export namespace StockItemAutoFacadeInterface {

    type StockItemAuto = {
        id: string
        value: string
    }

    export type FindByIdOutputDto = StockItemAuto | null
}