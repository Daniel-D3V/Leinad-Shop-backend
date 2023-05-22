import { BaseEvent } from "@/modules/@shared/events";

export class ProductStockNormalCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: ProductStockNormalCreatedEvent.Payload
    ){
        super();
    }
}

export namespace ProductStockNormalCreatedEvent {
    export type Payload = {
        id: string
        stock: number
    }
}