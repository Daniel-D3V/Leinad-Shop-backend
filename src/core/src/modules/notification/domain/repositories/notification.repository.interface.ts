import { NotificationEntity } from "../entities";

export interface NotificationRepositoryInterface { 
    create(notificationEntity: NotificationEntity): Promise<void>
    findById(id: string): Promise<NotificationEntity | null>
    update(notificationEntity: NotificationEntity): Promise<void>
}