import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockNormalUpdatedEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockNormalUpdatedEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockNormalUpdatedEvent {
    export type Payload = {
        productStockId: string
        newStock: number
    }
}