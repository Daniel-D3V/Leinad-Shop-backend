import { BaseEvent } from "@/modules/@shared/events";

export class PaymentGeneratedEvent extends BaseEvent {

    constructor(
        readonly payload: PaymentGeneratedEvent.Payload
    ){
        super();
    }
}

export namespace PaymentGeneratedEvent {
    export type Payload = {
        id: string
        orderId: string
        paymentMethod: string
        dateTimeCreated: Date
        status: string
        customer: {
            name: string
            email: string
        }
    }
}