import { UserActivityEntity } from "@/modules/user-activity/domain/entities";
import { UserActivityRepositoryInterface } from "@/modules/user-activity/domain/repositories";
import { PrismaClient, UserActivity } from "@prisma/client";


class PrismaUserActivityMapper {

    static toDomain(prismaUserActivity: UserActivity): UserActivityEntity {
        const userActivityEntity = UserActivityEntity.create({
            ...prismaUserActivity,
            lastSeen: prismaUserActivity.lastSeen ?? undefined
        }, prismaUserActivity.id)
        if(prismaUserActivity.status === "ONLINE") userActivityEntity.setStatusOnline()
        if(prismaUserActivity.StatusOptions === "IDLE") userActivityEntity.setOptionIdle()

        return userActivityEntity
    }
}

export class PrismaUserActivityRepository implements UserActivityRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(userActivityEntity: UserActivityEntity): Promise<void> {
        await this.prismaClient.userActivity.create({
            data: {
                ...userActivityEntity.toJSON()
            }
        })
    }
    async findByUserId(userId: string): Promise<UserActivityEntity | null> {
        const prismaUserActivity = await this.prismaClient.userActivity.findFirst({
            where: { userId }
        })
        if(!prismaUserActivity) return null
        return PrismaUserActivityMapper.toDomain(prismaUserActivity)
    }
    async update(userActivityEntity: UserActivityEntity): Promise<void> {
        const { id, userId, ...props } = userActivityEntity.toJSON()

        await this.prismaClient.userActivity.updateMany({
            where: { id: id ?? "" },
            data: {
                ...props
            }
        })
    }


}