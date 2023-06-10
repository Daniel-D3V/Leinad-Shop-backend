import { BaseEvent } from "@/modules/@shared/events";

export class ChatDeliveryDeliveredEvent extends BaseEvent {

    constructor(
        readonly payload: DeliverChatDeliveryEvent.Payload
    ) {
        super()
    }
}

export namespace DeliverChatDeliveryEvent {
    export type Payload = {
        chatDeliveryId: string
    }
}