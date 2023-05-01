import { BaseEvent } from "@/modules/@shared/events";

export class AnnounceImagesChangedEvent extends BaseEvent {

    constructor(
        readonly payload: AnnounceImagesChangedEvent.Payload
    ){
        super();
    }
}

export namespace AnnounceImagesChangedEvent {
    export type Payload = {
        announceId: string,
        images: {
            weight: number
            url: string
        }[]
    }
}