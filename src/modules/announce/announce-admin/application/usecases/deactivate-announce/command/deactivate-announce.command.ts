import { BaseCommand } from "@/modules/@shared/events";

export class DeactivateAnnounceCommand extends BaseCommand {

    constructor(
        readonly payload: DeactivateAnnounceCommand.Payload
    ){
        super();
    }
}

export namespace DeactivateAnnounceCommand {
    export type Payload = {
        announceId: string
    }
}