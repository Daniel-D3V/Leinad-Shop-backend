import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceDeactivatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceDeactivatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceDeactivatedEvent {
    export type Payload = {
        announceId: string
    }
}