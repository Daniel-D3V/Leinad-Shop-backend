import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories";
import { DeliveryChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/delivery-chat-delivery.usecase";
import { ChatDeliveryNotFoundError } from "../_errors";
import { ChatDeliveryAlreadyDeliveredError } from "./errors";
import { ChatDeliveryDeliveredEvent } from "./chat-delivery-delivered.event";

export class DeliveryChatDeliveryUsecase implements UsecaseInterface {
    constructor(
        private readonly chatDeliveryRepository: ChatDeliveryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ chatDeliveryId }: DeliveryChatDeliveryUsecaseInterface.InputDto): Promise<DeliveryChatDeliveryUsecaseInterface.OutputDto> {
        const chatDeliveryEntity = await this.chatDeliveryRepository.findById(chatDeliveryId);
        if (!chatDeliveryEntity) return left([new ChatDeliveryNotFoundError])

        if (chatDeliveryEntity.isDelivered()) return left([new ChatDeliveryAlreadyDeliveredError])

        chatDeliveryEntity.deliver();
        await this.chatDeliveryRepository.update(chatDeliveryEntity);

        const chatDeliveryDeliveredEvent = new ChatDeliveryDeliveredEvent({
            chatDeliveryId
        })

        await this.eventEmitter.emit(chatDeliveryDeliveredEvent)
        return right(null)
    }
}