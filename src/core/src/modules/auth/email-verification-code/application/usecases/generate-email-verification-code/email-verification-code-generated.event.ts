import { BaseEvent } from "@/modules/@shared/events";

export class EmailVerificationCodeGeneratedEvent extends BaseEvent {

    constructor(
        readonly payload: EmailVerificationCodeGeneratedEvent.Payload
    ){
        super();
    }
}

export namespace EmailVerificationCodeGeneratedEvent {
    export type Payload = {
        id: string
        code: string
        userId: string
        expirationDate: Date
    }
}