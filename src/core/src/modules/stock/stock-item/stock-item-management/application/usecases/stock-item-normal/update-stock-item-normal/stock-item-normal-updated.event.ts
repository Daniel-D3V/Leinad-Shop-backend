import { BaseEvent } from "@/modules/@shared/events";

export class StockItemNormalUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemNormalUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemNormalUpdatedEvent {
    export type Payload = {
        stockItemNormalId: string
        stock: number
    }
}