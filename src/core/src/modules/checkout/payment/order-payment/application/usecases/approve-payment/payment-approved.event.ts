import { BaseEvent } from "@/modules/@shared/events";

export class PaymentApprovedEvent extends BaseEvent {

    constructor(
        readonly payload: PaymentApprovedEvent.Payload
    ){
        super();
    }
}

export namespace PaymentApprovedEvent {
    export type Payload = {
        paymentId: string
        status: string
    }
}