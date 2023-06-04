import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { ChatDeliveryMessageEntity } from "@/modules/chat-delivery/domain/entities";
import { ChatDeliveryMessageRepositoryInterface } from "@/modules/chat-delivery/domain/repositories/chat-delivery-message.repository.interface";
import { SendMessageChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/send-message-chat-delivery-usecase.interface";
import { ChatDeliveryMessageSentEvent } from "./chat-delivery-message-sent.event";

export class SendMessageChatDeliveryUsecase implements UsecaseInterface {
    constructor(
        private readonly messageChatDeliveryRepository: ChatDeliveryMessageRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute(input: SendMessageChatDeliveryUsecaseInterface.InputDto): Promise<SendMessageChatDeliveryUsecaseInterface.OutputDto> {
        const messageChatDeliveryEntityOrError = ChatDeliveryMessageEntity.create({
            ...input
        })

        if (messageChatDeliveryEntityOrError.isLeft()) return left(messageChatDeliveryEntityOrError.value)

        await this.messageChatDeliveryRepository.create(messageChatDeliveryEntityOrError.value);

        const messageChatDeliveryCreatedEvent = new ChatDeliveryMessageSentEvent({
            ...messageChatDeliveryEntityOrError.value.toJSON()
        })

        await this.eventEmitter.emit(messageChatDeliveryCreatedEvent)

        return right({
            id: messageChatDeliveryEntityOrError.value.id
        })
    }
}