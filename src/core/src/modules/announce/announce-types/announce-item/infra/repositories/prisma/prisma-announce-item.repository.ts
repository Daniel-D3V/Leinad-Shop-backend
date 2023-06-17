import { PrismaClient } from "@prisma/client";
import { AnnounceItemEntity } from "../../../domain/entities";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";


export class PrismaAnnounceItemRepository implements AnnounceItemRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    async create(announceItem: AnnounceItemEntity): Promise<void> {
        await this.prismaClient.announceItem.create({
            data: {
                ...announceItem.toJSON()
            }
        })
    }

    async findById(id: string): Promise<AnnounceItemEntity | null> {
        const prismaAnnounceItem = await this.prismaClient.announceItem.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaAnnounceItem) return null
        
        const announceItemEntity = AnnounceItemEntity.create({
            ...prismaAnnounceItem
        }, prismaAnnounceItem.id)
        if(announceItemEntity.isLeft()) throw announceItemEntity.value[0]
        return announceItemEntity.value
    }

    async update(announceItem: AnnounceItemEntity): Promise<void> {
        const { id, announceId, ...props } = announceItem.toJSON()
        await this.prismaClient.announceItem.updateMany({
            where: { id: id ?? "" },
            data: {
                ...props
            }
        })
    }


}