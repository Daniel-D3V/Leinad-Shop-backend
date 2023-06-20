import { BaseEvent } from "@/modules/@shared/events";

export class TwoFactorAuthenticationValidateddEvent extends BaseEvent {

    constructor(
        readonly payload: TwoFactorAuthenticationValidateddEvent.Payload
    ){
        super();
    }
}

export namespace TwoFactorAuthenticationValidateddEvent {
    export type Payload = {
        twoFactorAuthenticationId: string
    }
}