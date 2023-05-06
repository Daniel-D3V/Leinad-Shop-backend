import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockAutoValueChangedEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockAutoValueChangedEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockAutoValueChangedEvent {
    export type Payload = {
        productStockId: string
        value: string
    }
}