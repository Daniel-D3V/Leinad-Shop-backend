import { AnnounceImageEntity } from "../../../domain/entities";
import { AnnounceImagesRepositoryInterface } from "../../../domain/repositories";

export class PrismaAnnounceImagesRepository implements AnnounceImagesRepositoryInterface {
    findById(id: string): Promise<AnnounceImageEntity | null> {
        throw new Error("Method not implemented.");
    }
    update(announceImageEntity: AnnounceImageEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}