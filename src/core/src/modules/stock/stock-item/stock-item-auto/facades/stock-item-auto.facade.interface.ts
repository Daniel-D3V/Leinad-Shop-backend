export interface StockItemAutoFacadeInterface {

    pickOne(): Promise<StockItemAutoFacadeInterface.FindByIdOutputDto>
}

export namespace StockItemAutoFacadeInterface {

    type StockItemAuto = {
        id: string
        value: string
    }

    export type FindByIdOutputDto = StockItemAuto | null
}