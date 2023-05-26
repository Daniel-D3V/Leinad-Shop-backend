import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockTypeChangedToAutoEvent {
    export type Payload = {
        productStockId: string
    }
}