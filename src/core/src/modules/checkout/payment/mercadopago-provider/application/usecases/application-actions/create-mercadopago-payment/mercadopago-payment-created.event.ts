import { BaseEvent } from "@/modules/@shared/events";

export class MercadopagoPaymentCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: MercadopagoPaymentCreatedEvent.Payload
    ){
        super();
    }
}

export namespace MercadopagoPaymentCreatedEvent {
    export type Payload = {
        id: string
        amount: number
        status: string
        orderPaymentId: string
        paymentMethod: string
        mercadopagoPaymentId: string
    }
}