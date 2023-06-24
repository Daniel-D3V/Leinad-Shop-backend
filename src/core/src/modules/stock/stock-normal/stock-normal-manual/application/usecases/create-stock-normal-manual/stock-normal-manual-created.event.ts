import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManualCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManualCreatedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManualCreatedEvent {
    export type Payload = {
        id: string
        stock: number
        announceNormalId: string
    }
}