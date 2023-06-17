import { AnnounceItemEntity } from "../entities";

export interface AnnounceItemRepositoryInterface {

    create(announceItem: AnnounceItemEntity): Promise<void>
    findById(id: string): Promise<AnnounceItemEntity | null>
    update(announceItem: AnnounceItemEntity): Promise<void>
}