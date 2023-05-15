import { BaseEvent } from "@/modules/@shared/events";

export class PaymentProcessedEvent extends BaseEvent {

    constructor(
        readonly payload: PaymentProcessedEvent.Payload
    ){
        super();
    }
}

export namespace PaymentProcessedEvent {
    export type Payload = {
        paymentId: string
        status: string
    }
}