import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceNormalCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceNormalCreatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceNormalCreatedEvent {
    export type Payload = {
        id: string
        price: number
        announceId: string
    }
}