import { BaseCommand } from "@/modules/@shared/events";

export class UpdateCategoryCommand extends BaseCommand {

    constructor(
        readonly payload: UpdateCategoryCommand.Payload
    ){
        super();
    }
}

export namespace UpdateCategoryCommand {
    export type Payload = {
        categoryId: string
        data: {
            title?: string
            description?: string
        }
    }
}