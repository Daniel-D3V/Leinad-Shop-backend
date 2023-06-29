import { BaseEvent } from "@/modules/@shared/events";

export class MercadopagoPaymentCancelledEvent extends BaseEvent {

    constructor(
        readonly payload: MercadopagoPaymentCancelledEvent.Payload
    ){
        super();
    }
}

export namespace MercadopagoPaymentCancelledEvent {
    export type Payload = {
        mercadopagoPaymentProviderId: string
    }
}