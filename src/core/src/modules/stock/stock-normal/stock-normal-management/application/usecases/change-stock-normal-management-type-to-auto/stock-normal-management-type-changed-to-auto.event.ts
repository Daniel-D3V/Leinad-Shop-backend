import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManagementTypeChangedToAutoEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManagementTypeChangedToAutoEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManagementTypeChangedToAutoEvent {
    export type Payload = {
        stockNormalManagementId: string
    }
}