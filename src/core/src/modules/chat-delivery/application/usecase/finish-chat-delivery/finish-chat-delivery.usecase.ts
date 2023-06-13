import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories";
import { ChatDeliveryNotFoundError } from "../_errors";
import { ChatDeliveryAlreadyFinishedError } from "./errors";
import { ChatDeliveryFinishedEvent } from "./chat-delivery-finished.event";
import { FinishChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/finish-chat-delivery.usecase.interface copy";

export class FinishChatDeliveryUsecase implements UsecaseInterface {
    constructor(
        private readonly chatDeliveryRepository: ChatDeliveryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ chatDeliveryId }: FinishChatDeliveryUsecaseInterface.InputDto): Promise<FinishChatDeliveryUsecaseInterface.OutputDto> {
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