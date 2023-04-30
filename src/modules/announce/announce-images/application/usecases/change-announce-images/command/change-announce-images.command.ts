import { BaseCommand } from "@/modules/@shared/events";

export class ChangeAnnounceImagesCommand extends BaseCommand {

    constructor(
        readonly payload: ChangeAnnounceImagesCommand.Payload
    ){
        super();
    }
}

export namespace ChangeAnnounceImagesCommand {
    export type Payload = {
        announceId: string,
        images: {
            weight: number
            url: string
        }[]
    }
}