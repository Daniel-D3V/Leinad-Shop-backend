import { BaseEvent } from "@/modules/@shared/events";

export class UserActivityCreatedEvent extends BaseEvent {

    constructor(
        readonly payload: UserActivityCreatedEvent.Payload
    ){
        super();
    }
}

export namespace UserActivityCreatedEvent {
    export type Payload = {
        id: string
        userId: string
        status: string
        StatusOptions: string
    }
}