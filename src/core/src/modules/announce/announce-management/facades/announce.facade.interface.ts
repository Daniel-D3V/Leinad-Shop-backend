import { AnnounceManagementEntity } from "../domain/entities"

export interface AnnounceFacadeInterface {

    consultAnnounceType(announceId: string): Promise<AnnounceFacadeInterface.announceTypes | null>
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
        title: string
        price: number
        announceType: AnnounceManagementEntity.AnnounceType
        announceTypeId: string
        stockType: "MANUAL" | "AUTO"
        stockAvailable: number
    }
}