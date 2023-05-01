import { BaseCommand } from "@/modules/@shared/events";

export class UpdateAnnounceCommand extends BaseCommand {

    constructor(
        readonly payload: UpdateAnnounceCommand.Payload
    ){
        super();
    }
}

export namespace UpdateAnnounceCommand {
    export type Payload = {
        announceId: string,
        data: {
            title?: string
            description?: string
            price?: number
        }
    }
}