import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceUpdatedEvent {
    export type Payload = {
        announceId: string,
        data: {
            title?: string
            description?: string
            price?: number
        }
    }
}