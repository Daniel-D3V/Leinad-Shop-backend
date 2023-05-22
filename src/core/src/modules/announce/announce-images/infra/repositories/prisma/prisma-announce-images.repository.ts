import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { AnnounceImageEntity } from "../../../domain/entities";
import { AnnounceImagesRepositoryInterface } from "../../../domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaAnnounceImagesRepository implements AnnounceImagesRepositoryInterface {

    prismaClient: PrismaClient

    constructor(provideprismaClient?: PrismaClient){
        this.prismaClient = provideprismaClient ?? prismaClient
    }

    async findById(id: string): Promise<AnnounceImageEntity | null> {
        
        const prismaAnnounce = await this.prismaClient.announce.findFirst({ where: { id } })
        if(!prismaAnnounce) return null;

        const prismaAnnounceImages = await this.prismaClient.announceImages.findMany({
            where: { announceId: id },
            orderBy: { weight: "asc" }
        })
        const announceImageEntity = AnnounceImageEntity.create({
            images: prismaAnnounceImages.map(img => ({ url: img.url, weight: img.weight  }))
        }, id)
        if(announceImageEntity.isLeft()) throw announceImageEntity.value[0]
        return announceImageEntity.value
    }

    async update(announceImageEntity: AnnounceImageEntity): Promise<void> {
        await this.prismaClient.announceImages.deleteMany({
            where: { announceId: announceImageEntity.id }
        })
        await this.prismaClient.announceImages.createMany({
            data: [
                ...announceImageEntity.images.map(images => ({ 
                    weight: images.weight, 
                    url: images.url, 
                    announceId: announceImageEntity.id
                }))
            ],
        })
    }

}