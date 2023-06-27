import { BaseEvent } from "@/modules/@shared/events";

export class MercadopagoPaymentGeneratedEvent extends BaseEvent {

    constructor(
        readonly payload: MercadopagoPaymentGeneratedEvent.Payload
    ){
        super();
    }
}

export namespace MercadopagoPaymentGeneratedEvent {
    export type Payload = {
        id: string
        amount: number
        status: string
        orderPaymentId: string
        paymentMethod: string
        mercadopagoPaymentId: string
    }
}