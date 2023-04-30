import { BaseCommand } from "@/modules/@shared/events";

export class BanAnnounceCommand extends BaseCommand {

    constructor(
        readonly payload: BanAnnounceCommand.Payload
    ){
        super();
    }
}

export namespace BanAnnounceCommand {
    export type Payload = {
        announceId: string
    }
}