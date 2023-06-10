import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories";
import { DeliverChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/deliver-chat-delivery.usecase.interface";
import { ChatDeliveryNotFoundError } from "../_errors";
import { ChatDeliveryAlreadyFinishedError } from "./errors";
import { ChatDeliveryFinishedEvent } from "./chat-delivery-finished.event";

export class FinishChatDeliveryUsecase implements UsecaseInterface {
    constructor(
        private readonly chatDeliveryRepository: ChatDeliveryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ chatDeliveryId }: DeliverChatDeliveryUsecaseInterface.InputDto): Promise<DeliverChatDeliveryUsecaseInterface.OutputDto> {
        const chatDeliveryEntity = await this.chatDeliveryRepository.findById(chatDeliveryId);
        if (!chatDeliveryEntity) return left([new ChatDeliveryNotFoundError])

        if (chatDeliveryEntity.isFinished()) return left([new ChatDeliveryAlreadyFinishedError])

        chatDeliveryEntity.finish();
        await this.chatDeliveryRepository.update(chatDeliveryEntity);

        const chatDeliveryFinishedEvent = new ChatDeliveryFinishedEvent({
            chatDeliveryId
        })

        await this.eventEmitter.emit(chatDeliveryFinishedEvent)
        return right(null)
    }
}