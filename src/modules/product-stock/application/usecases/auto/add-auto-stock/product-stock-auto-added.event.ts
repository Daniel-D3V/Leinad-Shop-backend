import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockAutoAddedEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockAutoAddedEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockAutoAddedEvent {
    export type Payload = {
        productStockId: string
        value: string
    }
}