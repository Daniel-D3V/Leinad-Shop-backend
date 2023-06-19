import { BaseEvent } from "@/modules/@shared/events";

export class EmailVerifiedEvent extends BaseEvent {

    constructor(
        readonly payload: EmailVerifiedEvent.Payload
    ){
        super();
    }
}

export namespace EmailVerifiedEvent {
    export type Payload = {
        userId: string
    }
}