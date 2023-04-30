import { BaseCommand } from "@/modules/@shared/events";

export class DeleteAnnounceCommand extends BaseCommand {

    constructor(
        readonly payload: DeleteAnnounceCommand.Payload
    ){
        super();
    }
}

export namespace DeleteAnnounceCommand {
    export type Payload = {
        announceId: string
    }
}