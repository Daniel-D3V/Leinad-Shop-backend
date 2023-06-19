import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManagementTypeChangedToManualEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManagementTypeChangedToManualEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManagementTypeChangedToManualEvent {
    export type Payload = {
        stockNormalManagementId: string
    }
}