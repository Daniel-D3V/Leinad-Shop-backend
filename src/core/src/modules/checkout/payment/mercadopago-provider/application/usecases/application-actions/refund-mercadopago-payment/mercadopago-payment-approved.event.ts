import { BaseEvent } from "@/modules/@shared/events";

export class MercadopagoPaymentRefundedEvent extends BaseEvent {

    constructor(
        readonly payload: MercadopagoPaymentRefundedEvent.Payload
    ){
        super();
    }
}

export namespace MercadopagoPaymentRefundedEvent {
    export type Payload = {
        mercadopagoPaymentProviderId: string
    }
}