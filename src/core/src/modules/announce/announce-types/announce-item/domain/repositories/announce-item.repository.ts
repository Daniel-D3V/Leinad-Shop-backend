import { AnnounceItemEntity } from "../entities";

export interface AnnounceItemRepositoryInterface {

    create(announceItem: AnnounceItemEntity): Promise<void>
}