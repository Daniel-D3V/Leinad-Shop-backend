import { AnnounceManagementEntity } from "../domain/entities"

export interface AnnounceFacadeInterface {
    getAnnounceDetails(input: AnnounceFacadeInterface.GetAnnounceDetailsInput): Promise<AnnounceFacadeInterface.AnnounceModel | null>
}

export namespace AnnounceFacadeInterface {
    export type announceTypes = AnnounceManagementEntity.AnnounceType

    export type GetAnnounceDetailsInput = {
        announceId: string
        announceTypeId: string
    }

    export type AnnounceModel = {
        announceId: string
        price: number
        announceType: AnnounceManagementEntity.AnnounceType
        announceTypeId: string
        stockType: "MANUAL" | "AUTO"
        stockAvailable: number
    }
}