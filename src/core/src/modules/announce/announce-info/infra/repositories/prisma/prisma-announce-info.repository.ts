import { AnnounceInfo, PrismaClient } from "@prisma/client";
import { AnnounceInfoEntity } from "../../../domain/entities";
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories";

class PrismaAnnounceInfoMapper {
    static toDomain(prismaAnnounceInfo: AnnounceInfo): AnnounceInfoEntity{
        const announceInfoEntity = AnnounceInfoEntity.create({
            ...prismaAnnounceInfo
        }, prismaAnnounceInfo.id)
        if(announceInfoEntity.isLeft()) throw announceInfoEntity.value[0]
        return announceInfoEntity.value
    }
}

export class PrismaAnnounceInfoRepository implements AnnounceInfoRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(announceInfoEntity: AnnounceInfoEntity): Promise<void> {
        await this.prismaClient.announceInfo.create({
            data: {
                ...announceInfoEntity.toJSON()
            }
        })
    }
    async findByAnnounceId(announceId: string): Promise<AnnounceInfoEntity | null> {
        const prismaAnnounceInfo = await this.prismaClient.announceInfo.findFirst({
            where: { announceId: announceId ?? "" }
        })
        if(!prismaAnnounceInfo) return null
        return PrismaAnnounceInfoMapper.toDomain(prismaAnnounceInfo)
    }
    async findById(id: string): Promise<AnnounceInfoEntity | null> {
        const prismaAnnounceInfo = await this.prismaClient.announceInfo.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaAnnounceInfo) return null
        return PrismaAnnounceInfoMapper.toDomain(prismaAnnounceInfo)
    }

    async update(announceInfoEntity: AnnounceInfoEntity): Promise<void> {
        const { id, announceId, ...props } = announceInfoEntity.toJSON()
        await this.prismaClient.announceInfo.updateMany({
            where: { id: id ?? "" },
            data: {
                ...props
            }
        })
    }
    
}