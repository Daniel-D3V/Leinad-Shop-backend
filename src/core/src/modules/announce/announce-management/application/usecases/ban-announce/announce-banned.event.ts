import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceBannedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceBannedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceBannedEvent {
    export type Payload = {
        announceId: string
    }
}