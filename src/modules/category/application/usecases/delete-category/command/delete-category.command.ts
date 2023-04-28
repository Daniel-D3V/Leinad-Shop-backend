import { BaseCommand } from "@/modules/@shared/events";

export class DeleteCategoryCommand extends BaseCommand {

    constructor(
        readonly payload: CreateCategoryCommand.Payload
    ){
        super();
    }
}

export namespace CreateCategoryCommand {
    export type Payload = {
        categoryId: string
    }
}