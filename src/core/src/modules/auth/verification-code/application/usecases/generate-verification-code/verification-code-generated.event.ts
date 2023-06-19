import { BaseEvent } from "@/modules/@shared/events";

export class VerificationCodeGeneratedEvent extends BaseEvent {

    constructor(
        readonly payload: UserSignupEvent.Payload
    ){
        super();
    }
}

export namespace UserSignupEvent {
    export type Payload = {
        id: string
        code: string
        userId: string
        expirationDate: Date
    }
}