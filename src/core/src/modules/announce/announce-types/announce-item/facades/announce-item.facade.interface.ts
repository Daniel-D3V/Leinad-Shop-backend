import { AnnounceItemEntity } from "../domain/entities"

export interface AnnounceItemFacadeInterface {
    getAnnounceItemDetails(announceItemId: string): Promise<AnnounceItemFacadeInterface.AnnounceItemModel | null> 
}

export namespace AnnounceItemFacadeInterface {

    export type AnnounceItemModel = {
        announceItemId: string
        price: number
        stockType: AnnounceItemEntity.StockType
        stockAvailable: number
    }
}