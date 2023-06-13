import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { ChatDeliveryEntity } from "@/modules/chat-delivery/domain/entities";
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories/chat-delivery.repository.interface";
import { InitializeChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/initilize-chat-delivery-usecase.interface";
import { InitializedChatDeliveryEvent } from "./chat-delivery-initialized.event";
import { ChatDeliveryAlreadyCreatedError } from "./_errors/chat-delivery-already-created.error";

export class InitializeChatDeliveryUsecase implements UsecaseInterface {
    constructor(
        private readonly chatDeliveryRepository: ChatDeliveryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute(input: InitializeChatDeliveryUsecaseInterface.InputDto): Promise<InitializeChatDeliveryUsecaseInterface.OutputDto> {
        const chatDeliveryEntityOrError = ChatDeliveryEntity.create({
            ...input,
        })

        if (chatDeliveryEntityOrError.isLeft()) return left(chatDeliveryEntityOrError.value)

        const chatDeliveryFoundByOrderId = await this.chatDeliveryRepository.findByOrderId(input.orderId);
        if (chatDeliveryFoundByOrderId) return left([new ChatDeliveryAlreadyCreatedError()])

        await this.chatDeliveryRepository.create(chatDeliveryEntityOrError.value);

        const chatDeliveryCreatedEvent = new InitializedChatDeliveryEvent({
            ...chatDeliveryEntityOrError.value.toJSON()
        })

        await this.eventEmitter.emit(chatDeliveryCreatedEvent)

        return right({
            id: chatDeliveryEntityOrError.value.id
        })
    };
}