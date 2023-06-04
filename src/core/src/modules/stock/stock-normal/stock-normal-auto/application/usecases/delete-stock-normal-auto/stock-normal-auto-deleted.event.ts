import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalAutoDeletedEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalAutoDeletedEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalAutoDeletedEvent {
    export type Payload = {
        stockNormalAutoId: string
    }
}