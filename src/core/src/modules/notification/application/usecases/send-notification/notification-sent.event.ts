import { BaseEvent } from "@/modules/@shared/events";

export class NotificationSentEvent extends BaseEvent {

    constructor(
        readonly payload: NotificationSentEvent.Payload
    ){
        super();
    }
}

export namespace NotificationSentEvent {
    export type Payload = {
        content: string
        topic: string
        userId: string
        hasBeenSeen: boolean
        dateTimeSent: Date
    }
}