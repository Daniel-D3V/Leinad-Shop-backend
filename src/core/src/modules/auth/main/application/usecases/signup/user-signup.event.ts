import { BaseEvent } from "@/modules/@shared/events";

export class UserSignupEvent extends BaseEvent {

    constructor(
        readonly payload: UserSignupEvent.Payload
    ){
        super();
    }
}

export namespace UserSignupEvent {
    export type Payload = {
        id: string
        username: string
        email: string
        password: string
    }
}