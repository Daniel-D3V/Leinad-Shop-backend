import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockAutoDeletedEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockAutoDeletedEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockAutoDeletedEvent {
    export type Payload = {
        productStockId: string
    }
}