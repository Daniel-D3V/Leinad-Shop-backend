import { BaseEvent } from "@/modules/@shared/events";

export class InitializedChatDeliveryEvent extends BaseEvent {

    constructor(
        readonly payload: InitializedChatDeliveryEvent.Payload
    ) {
        super();
    }
}

export namespace InitializedChatDeliveryEvent {
    export type Payload = {
        id: string
        salesmanId: string,
        customerId: string,
        orderId: string,
        status: string
    }
}