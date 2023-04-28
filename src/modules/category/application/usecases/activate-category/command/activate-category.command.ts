import { BaseCommand } from "@/modules/@shared/events";

export class ActivateCategoryCommand extends BaseCommand {

    constructor(
        readonly payload: ActivateCategoryCommand.Payload
    ){
        super();
    }
}

export namespace ActivateCategoryCommand {
    export type Payload = {
        categoryId: string
    }
}