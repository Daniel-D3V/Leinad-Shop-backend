import { AnnounceEntity } from "../entities";

export interface AnnounceRepositoryInterface {
    create(announceEntity: AnnounceEntity): Promise<void>
    findById(id: string): Promise<AnnounceEntity | null>
    delete(id: string): Promise<void>
    update(announceEntity: AnnounceEntity): Promise<void>
}