import { Announce, PrismaClient } from "@prisma/client";
import { AnnounceEntity } from "../../../domain/entities";
import { AnnounceRepositoryInterface } from "../../../domain/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";

const setStatus = (announceEntity: AnnounceEntity, status: string) => {
    if(status === "ACTIVE") announceEntity.activate()
    else if(status === "BANNED") announceEntity.ban()
    else announceEntity.deactivate()
}

class PrismaAnnounceEntityMapper {
    static toDomain(prismaAnnounce: Announce | null): AnnounceEntity | null {
        if(!prismaAnnounce) return null;
        const categoryEntity = AnnounceEntity.create({
            ...prismaAnnounce
        }, prismaAnnounce.id)
        if(categoryEntity.isLeft()) throw categoryEntity.value[0]

        setStatus(categoryEntity.value, prismaAnnounce.status)
        return categoryEntity.value
    }
} 
export class PrismaAnnounceRepository implements AnnounceRepositoryInterface {

    prismaClient: PrismaClient

    constructor(provideprismaClient?: PrismaClient){
        this.prismaClient = provideprismaClient ?? prismaClient
    }

    async create(announceEntity: AnnounceEntity): Promise<void> {
        await this.prismaClient.announce.create({
            data: {
                ...announceEntity.toJSON()
            }
        })
    }
    async findById(id: string): Promise<AnnounceEntity | null> {
        const prismaAnnounce = await this.prismaClient.announce.findFirst({
            where: { id }
        })
        return PrismaAnnounceEntityMapper.toDomain(prismaAnnounce)
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.announce.deleteMany({
            where: { id }
        })
    }
    async update(announceEntity: AnnounceEntity): Promise<void> {
        const { id, ...propsToUpdate } = announceEntity.toJSON()
        await this.prismaClient.announce.update({
            where: { id },
            data: {
              ...propsToUpdate,
            }
        })
    }
    
}