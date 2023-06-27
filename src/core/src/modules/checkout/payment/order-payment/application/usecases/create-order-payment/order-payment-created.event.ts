import { BaseEvent } from "@/modules/@shared/events";
import { OrderPaymentEntity } from "../../../domain/entities";

export class OrderPaymentCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: OrderPaymentCreatedEvent.Payload
    ){
        super();
    }
}

export namespace OrderPaymentCreatedEvent {
    export type Payload = {
        id: string
        orderPaymentCustomer: {
            id: string
            name: string
            email: string
        }
        orderId: string
        dateTimeCreated: Date
        paymentProvider?: OrderPaymentEntity.PaymentProvider 
        paymentProviderId?: string 
    }
}