import { AnnounceImageEntity } from "../entities";

export interface AnnounceImagesRepositoryInterface {
    findById(id: string): Promise<AnnounceImageEntity | null>
    update(announceImageEntity: AnnounceImageEntity): Promise<void>
}