import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { ChatDeliveryMessageAttachmentsEntity } from "../entities";

export interface SendMessageChatDeliveryUsecaseInterface extends UsecaseInterface {
    execute(data: SendMessageChatDeliveryUsecaseInterface.InputDto): Promise<SendMessageChatDeliveryUsecaseInterface.OutputDto>;
}

export namespace SendMessageChatDeliveryUsecaseInterface {
    export type InputDto = {
        authorId: string,
        chatId: string,
        content?: string,
        attachments?: ChatDeliveryMessageAttachmentsEntity[],
        dateTimeSent?: Date
    }

    export type OutputDto = Either<Error[], { id: string }>
}