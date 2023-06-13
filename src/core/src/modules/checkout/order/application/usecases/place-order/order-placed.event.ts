import { BaseEvent } from "@/modules/@shared/events";

export class OrderPlacedEvent extends BaseEvent {

    constructor(
        readonly payload: OrderPlacedEvent.Payload
    ){
        super();
    }
}

export namespace OrderPlacedEvent {
    export type Payload = {
        id: string
        customerId: string
        status: string
        total: number
        totalItemsQuantity: number
        orderItems: {
            id: string
            announceId: string
            announceTypeId: string
            quantity: number
            unitPrice: number
        }[]                 
    }       
}