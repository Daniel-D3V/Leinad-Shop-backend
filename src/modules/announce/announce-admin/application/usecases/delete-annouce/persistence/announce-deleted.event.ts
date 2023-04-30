import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceDeletedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceDeletedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceDeletedEvent {
    export type Payload = {
        announceId: string
    }
}