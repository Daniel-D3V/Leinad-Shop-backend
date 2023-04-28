import { BaseCommand } from "@/modules/@shared/events";

export class DeactivateCategoryCommand extends BaseCommand {

    constructor(
        readonly payload: DeactivateCategoryCommand.Payload
    ){
        super();
    }
}

export namespace DeactivateCategoryCommand {
    export type Payload = {
        categoryId: string
    }
}