import { AnnounceManagementEntity } from "../domain/entities"

export interface AnnounceFacadeInterface {

    consultAnnounceType(announceId: string): Promise<AnnounceFacadeInterface.announceTypes | null>
}

export namespace AnnounceFacadeInterface {

    export type announceTypes = AnnounceManagementEntity.AnnounceType
}