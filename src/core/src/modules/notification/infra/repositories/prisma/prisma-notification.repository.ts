import { NotificationEntity } from "@/modules/notification/domain/entities";
import { NotificationRepositoryInterface } from "@/modules/notification/domain/repositories";
import { PrismaClient } from "@prisma/client";


export class PrismaNotificationRepository implements NotificationRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(notificationEntity: NotificationEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<NotificationEntity | null> {
        throw new Error("Method not implemented.");
    }
    
    async update(notificationEntity: NotificationEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}