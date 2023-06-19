import { BaseEvent } from "@/modules/@shared/events";

export class AuthUserEmailVerifiedEvent extends BaseEvent {

    constructor(
        readonly payload: AuthUserEmailVerifiedEvent.Payload
    ){
        super();
    }
}

export namespace AuthUserEmailVerifiedEvent {
    export type Payload = {
        userId: string
    }
}