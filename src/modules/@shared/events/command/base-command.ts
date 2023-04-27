import { randomUUID } from "crypto";

export abstract class BaseCommand {
    id: string;
    schemaVersion: string = "1.0.0";
    dateTimeIssued: Date = new Date();
    commandName: string;

    abstract readonly payload: any;

    constructor() {
        this.id = randomUUID();
        this.commandName = this.constructor.name;
    }

    format(): BaseCommand.GetPayload {
        return {
            id: this.id,
            commandName: this.commandName,
            schemaVersion: this.schemaVersion,
            dateTimeIssued: this.dateTimeIssued,
            payload: this.payload
        };
    }
}

export namespace BaseCommand {
    export type GetPayload = {
        id: string;
        commandName: string;
        schemaVersion: string;
        dateTimeIssued: Date;
        payload: any;
    };
}
