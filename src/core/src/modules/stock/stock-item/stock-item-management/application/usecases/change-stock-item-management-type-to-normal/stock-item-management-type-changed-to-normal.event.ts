import { BaseEvent } from "@/modules/@shared/events";

export class StockItemManagementTypeChangedToNormalEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemManagementTypeChangedToNormalEvent.Payload
    ){
        super();
    }
}

export namespace StockItemManagementTypeChangedToNormalEvent {
    export type Payload = {
        stockItemManagementId: string
    }
}