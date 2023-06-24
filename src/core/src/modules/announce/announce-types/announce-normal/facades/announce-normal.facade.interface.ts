import { AnnounceNormalEntity } from "../domain/entities"

export interface AnnounceNormalFacadeInterface {
    getAnnounceNormalDetails(announceNormalId: string): Promise<AnnounceNormalFacadeInterface.AnnounceItemModel | null> 
}

export namespace AnnounceNormalFacadeInterface {

    export type AnnounceItemModel = {
        announceNormalId: string
        price: number
        stockType: AnnounceNormalEntity.StockType
        stockAvailable: number
    }
}