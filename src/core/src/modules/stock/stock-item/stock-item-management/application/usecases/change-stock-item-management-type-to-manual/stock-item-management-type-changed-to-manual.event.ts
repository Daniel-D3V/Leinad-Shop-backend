import { BaseEvent } from "@/modules/@shared/events";

export class StockItemManagementTypeChangedToManualEvent extends BaseEvent {

    constructor(
        readonly payload: StockItemManagementTypeChangedToManualEvent.Payload
    ){
        super();
    }
}

export namespace StockItemManagementTypeChangedToManualEvent {
    export type Payload = {
        stockItemManagementId: string
    }
}