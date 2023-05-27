import { BaseEvent } from "@/modules/@shared/events";

export class StockTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: StockTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace StockTypeChangedToAutoEvent {
    export type Payload = {
        id: string
    }
}