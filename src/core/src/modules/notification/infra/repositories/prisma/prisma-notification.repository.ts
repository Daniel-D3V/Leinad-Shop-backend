import { NotificationEntity } from "@/modules/notification/domain/entities";
import { NotificationRepositoryInterface } from "@/modules/notification/domain/repositories";
import { PrismaClient } from "@prisma/client";


export class PrismaNotificationRepository implements NotificationRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(notificationEntity: NotificationEntity): Promise<void> {
        await this.prismaClient.notification.create({
            data: {
                ...notificationEntity.toJSON()
            }
        })
    }

    async findById(id: string): Promise<NotificationEntity | null> {
        const prismaNotification = await this.prismaClient.notification.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaNotification) return null
        const notificationEntity = NotificationEntity.create({
            ...prismaNotification,
        }, prismaNotification.id)
        if(prismaNotification.hasBeenSeen) notificationEntity.markAsRead()
        return notificationEntity
    }
    
    async update(notificationEntity: NotificationEntity): Promise<void> {
        const { id, userId, ...props } = notificationEntity.toJSON()
        await this.prismaClient.notification.updateMany({
            where: { id: id ?? "" },
            data: {
                ...props
            }
        })
    }

}