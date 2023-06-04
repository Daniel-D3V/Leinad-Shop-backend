import { BaseEvent } from "@/modules/@shared/events";

export class StockTypeChangedToNormalEvent extends BaseEvent {

    constructor(
        readonly payload: StockTypeChangedToNormalEvent.Payload
    ){
        super();
    }
}

export namespace StockTypeChangedToNormalEvent {
    export type Payload = {
        id: string
    }
}