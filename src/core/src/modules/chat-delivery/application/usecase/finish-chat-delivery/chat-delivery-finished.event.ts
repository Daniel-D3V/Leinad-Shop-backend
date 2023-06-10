import { BaseEvent } from "@/modules/@shared/events";

export class ChatDeliveryFinishedEvent extends BaseEvent {

    constructor(
        readonly payload: ChatDeliveryFinishedEvent.Payload
    ) {
        super()
    }
}

export namespace ChatDeliveryFinishedEvent {
    export type Payload = {
        chatDeliveryId: string
    }
}