import { BaseEvent } from "@/modules/@shared/events";

export class StockItemNormalInitializedEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemNormalInitializedEvent.Payload
    ){
        super();
    }
}

export namespace StockItemNormalInitializedEvent {
    export type Payload = {
        id: string
        stock: number
        stockItemId: string
    }
}