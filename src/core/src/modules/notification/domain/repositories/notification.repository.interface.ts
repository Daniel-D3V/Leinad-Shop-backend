import { NotificationEntity } from "../entities";

export interface NotificationRepositoryInterface { 
    create(notificationEntity: NotificationEntity): Promise<void>
}