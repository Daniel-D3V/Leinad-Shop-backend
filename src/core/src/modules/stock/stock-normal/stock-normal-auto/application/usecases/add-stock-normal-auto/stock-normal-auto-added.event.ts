import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalAutoAddedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalAutoAddedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalAutoAddedEvent {
    export type Payload = {
        id: string
        value: string
        announceNormalId: string
    }
}