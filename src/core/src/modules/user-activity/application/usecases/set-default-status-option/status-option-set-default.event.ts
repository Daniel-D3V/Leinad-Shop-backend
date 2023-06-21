import { BaseEvent } from "@/modules/@shared/events";

export class StatusOptionSetDefaultEvent extends BaseEvent {

    constructor(
        readonly payload: StatusOptionSetDefaultEvent.Payload
    ){
        super();
    }
}

export namespace StatusOptionSetDefaultEvent {
    export type Payload = {
        userActivityId: string
    }
}