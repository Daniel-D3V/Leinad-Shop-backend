import { AnnounceNormalEntity } from "../entities";

export interface AnnounceNormalRepositoryInterface {

    create(announceNormalEntity: AnnounceNormalEntity): Promise<void>
    findById(id: string): Promise<AnnounceNormalEntity | null>
    findByAnnounceId(announceId: string): Promise<AnnounceNormalEntity | null>
}