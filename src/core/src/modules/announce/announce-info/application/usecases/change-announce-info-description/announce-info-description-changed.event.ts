import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceInfoDescriptionChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceInfoDescriptionChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceInfoDescriptionChangedEvent {
    export type Payload = {
        announceInfoId: string
        description: string
    }
}