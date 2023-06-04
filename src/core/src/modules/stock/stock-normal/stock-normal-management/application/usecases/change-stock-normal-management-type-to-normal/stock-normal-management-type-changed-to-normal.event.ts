import { BaseEvent } from "@/modules/@shared/events";

export class StockNormalManagementTypeChangedToNormalEvent extends BaseEvent {

    constructor(
        readonly payload: StockNormalManagementTypeChangedToNormalEvent.Payload
    ){
        super();
    }
}

export namespace StockNormalManagementTypeChangedToNormalEvent {
    export type Payload = {
        stockNormalManagementId: string
    }
}