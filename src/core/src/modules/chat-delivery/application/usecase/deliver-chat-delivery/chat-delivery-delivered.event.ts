import { BaseEvent } from "@/modules/@shared/events";

export class ChatDeliveryDeliveredEvent extends BaseEvent {

    constructor(
        readonly payload: ChatDeliveryDeliveredEvent.Payload
    ) {
        super()
    }
}

export namespace ChatDeliveryDeliveredEvent {
    export type Payload = {
        chatDeliveryId: string
    }
}