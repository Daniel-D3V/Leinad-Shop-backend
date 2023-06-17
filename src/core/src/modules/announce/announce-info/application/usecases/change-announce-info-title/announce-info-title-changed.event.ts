import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceInfoTitleChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceInfoTitleChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceInfoTitleChangedEvent {
    export type Payload = {
        announceInfoId: string
        title: string
    }
}