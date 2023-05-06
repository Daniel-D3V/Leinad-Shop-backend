import { BaseEvent } from "@/modules/@shared/events";

export class AnnouncePriceChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnouncePriceChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnouncePriceChangedEvent {
    export type Payload = {
        announceId: string
        price: number
    }
}