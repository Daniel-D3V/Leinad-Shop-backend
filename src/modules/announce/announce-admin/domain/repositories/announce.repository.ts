import { AnnounceEntity } from "../entities";

export interface AnnounceRepositoryInterface {
    create(announceEntity: AnnounceEntity): Promise<void>
}