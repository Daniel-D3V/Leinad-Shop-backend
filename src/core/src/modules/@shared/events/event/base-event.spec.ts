import { BaseEvent } from "./base-event";


const makeEventStub = (options?: { schemaVersion?: string  }): BaseEvent => {
    class EventStub extends BaseEvent {
        constructor(public readonly payload: { name: string, description: string }){
            super()
            if(options?.schemaVersion){
                this.schemaVersion = options.schemaVersion
            }
        }
    } 
    return new EventStub({
        name: "any_name",
        description: "any_description",
    })
}


describe("test base-event", () => {

    it("Should set the eventName property to the name of the class extending the base event", () => {
        const eventStub = makeEventStub()
        expect(eventStub.eventName).toBe("EventStub")
    })

    it("Should start the schemaVersion to 1.0.1=0", () => {
        const eventStub = makeEventStub()
        expect(eventStub.schemaVersion).toBe("1.0.0")
    })

    it("Should set the schemaVersion to 1.0.1", () => {
        const eventStub = makeEventStub({
            schemaVersion: "1.0.1"
        })
        expect(eventStub.schemaVersion).toBe("1.0.1")
    })

    it("Should return the formated event", () => {
        const eventStub = makeEventStub()
        const formatedEvent = eventStub.format()
        expect(formatedEvent.id).toBeTruthy()
        expect(formatedEvent.dateTimeOccurred).toBeInstanceOf(Date)
        expect(formatedEvent.eventName).toBe("EventStub")
        expect(formatedEvent.schemaVersion).toBe("1.0.0")
        expect(formatedEvent.payload.name).toBe("any_name")
        expect(formatedEvent.payload.description).toBe("any_description")
    })
})