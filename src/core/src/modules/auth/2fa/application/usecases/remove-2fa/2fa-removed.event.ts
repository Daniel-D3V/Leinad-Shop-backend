import { BaseEvent } from "@/modules/@shared/events";

export class TwoFactorAuthenticationRemovedEvent extends BaseEvent {

    constructor(
        readonly payload: TwoFactorAuthenticationRemovedEvent.Payload
    ){
        super();
    }
}

export namespace TwoFactorAuthenticationRemovedEvent {
    export type Payload = {
        twoFactorAuthenticationId: string
    }
}