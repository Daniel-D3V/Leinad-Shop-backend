import { BaseEvent } from "@/modules/@shared/events";

export class StockTypeChangedToItemEvent extends BaseEvent {

    constructor(
        readonly payload: StockTypeChangedToItemEvent.Payload
    ){
        super();
    }
}

export namespace StockTypeChangedToItemEvent {
    export type Payload = {
        id: string
    }
}