import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceItemTitleChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceItemTitleChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceItemTitleChangedEvent {
    export type Payload = {
        announceItemId: string
        title: string
    }
}