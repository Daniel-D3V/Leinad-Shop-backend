import { BaseEvent } from "@/modules/@shared/events";

export class MercadopagoPaymentApprovedEvent extends BaseEvent {

    constructor(
        readonly payload: MercadopagoPaymentApprovedEvent.Payload
    ){
        super();
    }
}

export namespace MercadopagoPaymentApprovedEvent {
    export type Payload = {
        mercadopagoPaymentProviderId: string
    }
}