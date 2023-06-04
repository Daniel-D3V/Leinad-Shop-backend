import { BaseEvent } from "@/modules/@shared/events";

export class StockItemManagementTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemManagementTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace StockItemManagementTypeChangedToAutoEvent {
    export type Payload = {
        stockItemManagementId: string
    }
}