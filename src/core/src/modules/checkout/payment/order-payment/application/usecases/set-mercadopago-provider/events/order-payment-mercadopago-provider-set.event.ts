import { BaseEvent } from "@/modules/@shared/events";

export class OrderPaymentMercadopagoProviderSetEvent extends BaseEvent {

    constructor(
        readonly payload: OrderPaymentMercadopagoProviderSetEvent.Payload
    ){
        super();
    }
}

export namespace OrderPaymentMercadopagoProviderSetEvent {
    export type Payload = {
        orderPaymentId: string
        mercadopagoProviderId: string
    }
}