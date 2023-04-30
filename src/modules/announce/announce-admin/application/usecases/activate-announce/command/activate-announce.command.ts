import { BaseCommand } from "@/modules/@shared/events";

export class ActivateAnnounceCommand extends BaseCommand {

    constructor(
        readonly payload: ActivateAnnounceCommand.Payload
    ){
        super();
    }
}

export namespace ActivateAnnounceCommand {
    export type Payload = {
        announceId: string
    }
}