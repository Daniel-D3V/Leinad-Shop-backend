import { AnnounceNormal, PrismaClient } from "@prisma/client";
import { AnnounceNormalEntity } from "../../../domain/entities";
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories";

class PrismaAnnounceNormalMapper {

    static toDomain(prismaAnnounceNormal: AnnounceNormal): AnnounceNormalEntity {

        const announceNormalEntity = AnnounceNormalEntity.create({
            ...prismaAnnounceNormal
        }, prismaAnnounceNormal.id)
        if(announceNormalEntity.isLeft()) throw announceNormalEntity.value[0]
        return announceNormalEntity.value
    }
}

export class PrismaAnnounceNormalRepository implements AnnounceNormalRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(announceNormalEntity: AnnounceNormalEntity): Promise<void> {
        await this.prismaClient.announceNormal.create({
            data: {
                ...announceNormalEntity.toJSON()
            }
        })
    }
    async findById(id: string): Promise<AnnounceNormalEntity | null> {
        const prismaAnnounceNormal = await this.prismaClient.announceNormal.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaAnnounceNormal) return null
        return PrismaAnnounceNormalMapper.toDomain(prismaAnnounceNormal)
    }
    async findByAnnounceId(announceId: string): Promise<AnnounceNormalEntity | null> {
        const prismaAnnounceNormal = await this.prismaClient.announceNormal.findFirst({
            where: { announceId: announceId ?? "" }
        })
        if(!prismaAnnounceNormal) return null
        return PrismaAnnounceNormalMapper.toDomain(prismaAnnounceNormal)
    }

}