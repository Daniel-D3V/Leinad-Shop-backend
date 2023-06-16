import { PrismaClient } from "@prisma/client"
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories"
import { AnnounceManagementEntity } from "../../../domain/entities"

export class PrismaAnnounceManagementRepository implements AnnounceManagementRepositoryInterface {

    constructor(
        private readonly prisma: PrismaClient
    ){}

    async findById(announceId: string): Promise<AnnounceManagementEntity | null> {
        const prismaAnnounceManagement = await this.prisma.announceManagement.findUnique({
            where: {
                id: announceId
            }
        })
        if(!prismaAnnounceManagement) return null

        const announceManagementEntity = AnnounceManagementEntity.create({
            ...prismaAnnounceManagement
        }, prismaAnnounceManagement.id)
        if(announceManagementEntity.isLeft()) throw announceManagementEntity.value[0]

        return announceManagementEntity.value
    }

    async update(announceManagementEntity: AnnounceManagementEntity): Promise<void> {
        const { id, userId, ...props } = announceManagementEntity.toJSON()
        await this.prisma.announceManagement.update({
            where: {
                id: id ?? ""
            },
            data: {
                ...props
            }
        })
    }

    async create(announceManagementEntity: AnnounceManagementEntity): Promise<void> {
        await this.prisma.announceManagement.create({
            data: {
                ...announceManagementEntity.toJSON()
            }
        })
    }

}