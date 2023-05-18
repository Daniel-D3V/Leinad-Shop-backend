import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceInfoUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceInfoUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceInfoUpdatedEvent {
    export type Payload = {
        announceId: string,
        data: {
            title?: string
            description?: string
        }
    }
}