import { StockNormalManagementEntity } from "../domain/entities"

export interface ConsultStockNormalStockTypeFacadeInterface {
    consult(input: ConsultStockNormalStockTypeFacadeInterface.InputDto): Promise<ConsultStockNormalStockTypeFacadeInterface.OutputDto>
    consultByAnnounceNormalId(input: ConsultStockNormalStockTypeFacadeInterface.InputDtoByAnnounceItemId): Promise<ConsultStockNormalStockTypeFacadeInterface.OutputDto>
}

export namespace ConsultStockNormalStockTypeFacadeInterface {
    export type InputDto = {
        stockNormalId: string
    }
    export type InputDtoByAnnounceItemId = {
        announceNormalId: string
    }
    export type OutputDto = StockNormalManagementEntity.StockType | null
}