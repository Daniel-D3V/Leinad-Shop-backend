import { BaseEvent } from "@/modules/@shared/events";

export class TwoFactorAuthenticationValidatedEvent extends BaseEvent {

    constructor(
        readonly payload: TwoFactorAuthenticationValidatedEvent.Payload
    ){
        super();
    }
}

export namespace TwoFactorAuthenticationValidatedEvent {
    export type Payload = {
        twoFactorAuthenticationId: string
    }
}