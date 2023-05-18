import { BaseEvent } from "@/modules/@shared/events";

export class StockForOrderAllocatedEvent extends BaseEvent {

    constructor(
        readonly payload: StockForOrderAllocatedEvent.Payload
    ){
        super();
    }
}

export namespace StockForOrderAllocatedEvent {
    export type Payload = {
        orderId: string
    }
}