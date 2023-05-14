import { BaseEvent } from "@/modules/@shared/events";

export class StockAllocationForOrderFailedEvent extends BaseEvent {

    constructor(
        readonly payload: StockAllocationForOrderFailedEvent.Payload
    ){
        super();
    }
}

export namespace StockAllocationForOrderFailedEvent {
    export type Payload = {
        orderId: string
        logs: {
            reason: string
            description: string
        }
    }
}