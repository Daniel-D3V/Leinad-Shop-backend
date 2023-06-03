import { AnnounceManagementEntity } from "../entities";

export interface AnnounceManagementRepositoryInterface {
    create(announceEntity: AnnounceManagementEntity): Promise<void>;
}