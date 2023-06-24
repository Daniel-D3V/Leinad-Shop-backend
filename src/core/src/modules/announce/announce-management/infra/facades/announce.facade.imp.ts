import { AnnounceItemFacadeInterface } from "@/modules/announce/announce-types/announce-item/facades";
import { AnnounceManagementEntity } from "../../domain/entities";
import { AnnounceManagementRepositoryInterface } from "../../domain/repositories";
import { AnnounceFacadeInterface } from "../../facades";
import { AnnounceNormalFacadeInterface } from "@/modules/announce/announce-types/announce-normal/facades";

type AnnounceTypeDetails = {
    announceTypeId: string
    price: number
    stockAvailable: number
    stockType: AnnounceFacadeInterface.AnnounceModel["stockType"]
}

export class AnnounceFacadeImp implements AnnounceFacadeInterface {

    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly announceNormalFacade: AnnounceNormalFacadeInterface,
        private readonly announceItemFacade: AnnounceItemFacadeInterface
    ){}

    async getAnnounceDetails({ announceId, announceTypeId }: AnnounceFacadeInterface.GetAnnounceDetailsInput): Promise<AnnounceFacadeInterface.AnnounceModel | null> {

        const announceManagementEntity = await this.announceManagementRepository.findById(announceId)
        if(!announceManagementEntity) return null

        const announceTypeDetails = await this.getAnnounceTypeDetails(
            announceManagementEntity.announceType, 
            announceTypeId
        )
        if(!announceTypeDetails) return null

        return {
            announceId: announceManagementEntity.id,
            announceType: announceManagementEntity.announceType,
            announceTypeId: announceTypeDetails.announceTypeId,
            price: announceTypeDetails.price,
            stockType: announceTypeDetails.stockType,
            stockAvailable: announceTypeDetails.stockAvailable,
        }
    }

    async getAnnounceTypeDetails(announceType: AnnounceManagementEntity.AnnounceType, announceTypeId: string): Promise<AnnounceTypeDetails | null> {
        switch(announceType){
            case "NORMAL":
                const announceNormalDetails = await this.announceNormalFacade.getAnnounceNormalDetails(announceTypeId)
                if(!announceNormalDetails) return null
                return {
                    announceTypeId: announceNormalDetails.announceNormalId,
                    ...announceNormalDetails
                }
            case "ITEM":
                const announceItemDetails = await this.announceItemFacade.getAnnounceItemDetails(announceTypeId)
                if(!announceItemDetails) return null
                return {
                    announceTypeId: announceItemDetails.announceItemId,
                    ...announceItemDetails
                }
        }

        return null
    }
}