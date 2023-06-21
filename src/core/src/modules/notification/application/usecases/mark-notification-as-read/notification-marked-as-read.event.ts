import { BaseEvent } from "@/modules/@shared/events";

export class NotificationMarkedAsReadEvent extends BaseEvent {

    constructor(
        readonly payload: NotificationMarkedAsReadEvent.Payload
    ){
        super();
    }
}

export namespace NotificationMarkedAsReadEvent {
    export type Payload = {
        notificationId: string
    }
}