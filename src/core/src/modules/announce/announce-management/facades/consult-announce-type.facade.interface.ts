import { AnnounceManagementEntity } from "../domain/entities";

export interface ConsultAnnounceTypeFacadeInterface {

    consult(input: ConsultAnnounceTypeFacadeInterface.InputDto): Promise<ConsultAnnounceTypeFacadeInterface.OutputDto>
}

export namespace ConsultAnnounceTypeFacadeInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = AnnounceManagementEntity.AnnounceType | null
}