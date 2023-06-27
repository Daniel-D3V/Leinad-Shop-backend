import { BaseEvent } from "@/modules/@shared/events";

export class OrderPaymentMercadopagoAssignmentFailureEvent extends BaseEvent {

    constructor(
        readonly payload: OrderPaymentMercadopagoAssignmentFailureEvent.Payload
    ){
        super();
    }
}

export namespace OrderPaymentMercadopagoAssignmentFailureEvent {
    export type Payload = {
        orderPaymentId: string
        mercadopagoProviderId: string
    }
}