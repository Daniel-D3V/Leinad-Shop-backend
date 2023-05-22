import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockTypeChangedToManualEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockTypeChangedToManualEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockTypeChangedToManualEvent {
    export type Payload = {
        productStockId: string
    }
}