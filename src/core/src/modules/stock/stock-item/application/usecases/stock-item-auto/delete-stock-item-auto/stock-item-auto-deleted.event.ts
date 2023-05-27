import { BaseEvent } from "@/modules/@shared/events";

export class StockItemAutoDeletedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemAutoDeletedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemAutoDeletedEvent {
    export type Payload = {
        stockItemAutoId: string
    }
}