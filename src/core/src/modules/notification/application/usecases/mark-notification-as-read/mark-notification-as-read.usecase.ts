import { left, right } from "@/modules/@shared/logic";
import { NotificationRepositoryInterface } from "@/modules/notification/domain/repositories";
import { MarkNotificationAsReadUsecaseInterface } from "@/modules/notification/domain/usecases";
import { NotificationNotFoundError } from "../errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { NotificationMarkedAsReadEvent } from "./notification-marked-as-read.event";


export class MarkNotificationAsReadUsecase implements MarkNotificationAsReadUsecaseInterface {

    constructor(
        private readonly notificationRepository: NotificationRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ notificationId }: MarkNotificationAsReadUsecaseInterface.InputDto): Promise<MarkNotificationAsReadUsecaseInterface.OutputDto> {
        
        const notificationEntity = await this.notificationRepository.findById(notificationId)
        if(!notificationEntity) return left([ new NotificationNotFoundError() ])

        notificationEntity.markAsRead()
        await this.notificationRepository.update(notificationEntity)

        const notificationMarkedAsReadEvent = new NotificationMarkedAsReadEvent({
            notificationId: notificationEntity.id,
        })
        await this.eventEmitter.emit(notificationMarkedAsReadEvent)

        return right(null)
    }
}