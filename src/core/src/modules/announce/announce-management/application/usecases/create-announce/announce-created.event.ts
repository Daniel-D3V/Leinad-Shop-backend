import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceCreatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceCreatedEvent {
    export type Payload = {
        id: string
        status: string
        announceType: string
        categoryId: string
        userId: string
    }
}