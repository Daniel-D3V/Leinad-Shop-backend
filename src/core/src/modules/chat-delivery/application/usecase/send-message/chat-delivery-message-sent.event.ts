import { BaseEvent } from "@/modules/@shared/events";
import { ChatDeliveryMessageAttachmentsEntity } from "@/modules/chat-delivery/domain/entities";

export class ChatDeliveryMessageSentEvent extends BaseEvent {

    constructor(
        readonly payload: ChatDeliveryMessageSentEvent.Payload
    ) {
        super();
    }
}

export namespace ChatDeliveryMessageSentEvent {
    export type Payload = {
        id: string,
        authorId: string,
        chatId: string,
        content?: string,
        attachments?: { attachment: string, type: string }[],
        dateTimeSent: Date
    }
}