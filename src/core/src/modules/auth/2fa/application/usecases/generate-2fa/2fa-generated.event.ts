import { BaseEvent } from "@/modules/@shared/events";

export class TwoFactorAuthenticationGeneratedEvent extends BaseEvent {

    constructor(
        readonly payload: TwoFactorAuthenticationGeneratedEvent.Payload
    ){
        super();
    }
}

export namespace TwoFactorAuthenticationGeneratedEvent {
    export type Payload = {
        id: string
        secret: string
        userId: string
        isValid: boolean
    }
}