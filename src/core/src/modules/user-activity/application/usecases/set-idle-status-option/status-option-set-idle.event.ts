import { BaseEvent } from "@/modules/@shared/events";

export class StatusOptionSetIdleEvent extends BaseEvent {

    constructor(
        readonly payload: StatusOptionSetIdleEvent.Payload
    ){
        super();
    }
}

export namespace StatusOptionSetIdleEvent {
    export type Payload = {
        userActivityId: string
    }
}