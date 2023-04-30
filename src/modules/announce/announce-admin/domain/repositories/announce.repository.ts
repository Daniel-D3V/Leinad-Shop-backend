import { AnnounceEntity } from "../entities";

export interface AnnounceRepositoryInterface {
    create(announceEntity: AnnounceEntity): Promise<void>
    findById(id: string): Promise<AnnounceEntity | null>
}