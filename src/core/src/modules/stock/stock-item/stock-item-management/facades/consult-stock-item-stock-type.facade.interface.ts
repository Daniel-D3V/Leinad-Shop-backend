import { StockItemManagementEntity } from "../domain/entities"

export interface ConsultStockItemStockTypeFacadeInterface {
    consult(input: ConsultStockItemStockTypeFacadeInterface.InputDto): Promise<ConsultStockItemStockTypeFacadeInterface.OutputDto>
    consultByAnnounceItemId(input: ConsultStockItemStockTypeFacadeInterface.InputDtoByAnnounceItemId): Promise<ConsultStockItemStockTypeFacadeInterface.OutputDto>
}

export namespace ConsultStockItemStockTypeFacadeInterface {
    export type InputDto = {
        stockItemId: string
    }
    export type InputDtoByAnnounceItemId = {
        announceItemId: string
    }
    export type OutputDto = StockItemManagementEntity.StockItemType | null
}