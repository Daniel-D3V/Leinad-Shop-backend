import { randomUUID } from "crypto"

export abstract class BaseEvent {
    id: string;
    schemaVersion: string = "1.0.0"
    dateTimeOccurred: Date = new Date();
    eventName: string;
    abstract topic: string;

    abstract readonly payload: any;

    constructor() {
        this.id = randomUUID()
        this.eventName = this.constructor.name;
    }


    format(): BaseEvent.GetPayload {
        return {
            id: this.id,
            topic: this.topic,
            eventName: this.eventName,
            schemaVersion: this.schemaVersion,
            dateTimeOccurred: this.dateTimeOccurred,
            payload: this.payload
        };
    }
}

export namespace BaseEvent {
    export type GetPayload = {
        id: string 
        eventName: string
        topic: string
        schemaVersion: string
        dateTimeOccurred: Date,
        payload: any
    }
}