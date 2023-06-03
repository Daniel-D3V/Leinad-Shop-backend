import { AnnounceInfoEntity } from "../entities";

export interface AnnounceInfoRepositoryInterface {
    create(announceInfoEntity: AnnounceInfoEntity): Promise<void>
    findByAnnounceId(announceId: string): Promise<AnnounceInfoEntity | null>
    findById(id: string): Promise<AnnounceInfoEntity | null>
}