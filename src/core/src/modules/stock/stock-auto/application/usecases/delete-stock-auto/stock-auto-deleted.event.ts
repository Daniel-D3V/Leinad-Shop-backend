import { BaseEvent } from "@/modules/@shared/events";

export class StockAutoDeletedEvent extends BaseEvent {

    constructor(
        readonly payload: StockAutoDeletedEvent.Payload
    ){
        super();
    }
}

export namespace StockAutoDeletedEvent {
    export type Payload = {
        stockAutoId: string
    }
}