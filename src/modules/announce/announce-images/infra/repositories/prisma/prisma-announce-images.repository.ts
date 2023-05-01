import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { AnnounceImageEntity } from "../../../domain/entities";
import { AnnounceImagesRepositoryInterface } from "../../../domain/repositories";

export class PrismaAnnounceImagesRepository implements AnnounceImagesRepositoryInterface {
    async findById(id: string): Promise<AnnounceImageEntity | null> {
        
        const prismaAnnounce = await prismaClient.announce.findFirst({ where: { id } })
        if(!prismaAnnounce) return null;

        const prismaAnnounceImages = await prismaClient.announceImages.findMany({
            where: { announceId: id }
        })
        const announceImageEntity = AnnounceImageEntity.create({
            images: prismaAnnounceImages.map(img => ({ url: img.url, weight: img.weight  }))
        }, id)
        if(announceImageEntity.isLeft()) throw announceImageEntity.value[0]
        return announceImageEntity.value
    }

    async update(announceImageEntity: AnnounceImageEntity): Promise<void> {
        await prismaClient.announceImages.deleteMany({
            where: { announceId: announceImageEntity.id }
        })
        await prismaClient.announceImages.createMany({
            data: [
                ...announceImageEntity.images.map(images => ({ 
                    weight: images.weight, 
                    url: images.url, 
                    announceId: announceImageEntity.id
                }))
            ]
        })
    }

}