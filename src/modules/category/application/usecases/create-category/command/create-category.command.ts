import { BaseCommand } from "@/modules/@shared/events";

export class CreateCategoryCommand extends BaseCommand {

    constructor(
        readonly payload: CreateCategoryCommand.Payload
    ){
        super();
    }
}

export namespace CreateCategoryCommand {
    export type Payload = {
        id: string
        title: string
        description: string
        parrentId?: string
        status: string
    }
}