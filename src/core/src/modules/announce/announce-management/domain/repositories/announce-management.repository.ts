import { AnnounceManagementEntity } from "../entities";

export interface AnnounceManagementRepositoryInterface {
    findById(id: string): Promise<AnnounceManagementEntity | null>;
    create(announceEntity: AnnounceManagementEntity): Promise<void>;
    update(announceEntity: AnnounceManagementEntity): Promise<void>;
}