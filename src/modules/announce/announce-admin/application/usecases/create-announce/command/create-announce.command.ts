import { BaseCommand } from "@/modules/@shared/events";

export class CreateAnnounceCommand extends BaseCommand {

    constructor(
        readonly payload: CreateAnnounceCommand.Payload
    ){
        super();
    }
}

export namespace CreateAnnounceCommand {
    export type Payload = {
        title: string
        description: string
        price: number
        categoryId: string
        userId: string
    }
}