import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceItemCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceItemCreatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceItemCreatedEvent {
    export type Payload = {
        id: string
        announceId: string
        price: number
        title: string
    }
}