import { right } from "@/modules/@shared/logic";
import { NotificationEntity } from "@/modules/notification/domain/entities";
import { NotificationRepositoryInterface } from "@/modules/notification/domain/repositories";
import { SendNotificationUsecaseInterface } from "@/modules/notification/domain/usecases";
import { NotificationSentEvent } from "./notification-sent.event";
import { EventEmitterInterface } from "@/modules/@shared/events";


export class SendNotificationUsecase implements SendNotificationUsecaseInterface {

    constructor(
        private readonly notificationRepository: NotificationRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: SendNotificationUsecaseInterface.InputDto): Promise<SendNotificationUsecaseInterface.OutputDto> {
        
        const notificationEntity = NotificationEntity.create({
            ...input,
            dateTimeSent: undefined,
        })
        await this.notificationRepository.create(notificationEntity)        

        const notificationSentEvent = new NotificationSentEvent({
            ...notificationEntity.toJSON()
        })
        await this.eventEmitter.emit(notificationSentEvent)

        return right({
            id: notificationEntity.id
        })
    }
}