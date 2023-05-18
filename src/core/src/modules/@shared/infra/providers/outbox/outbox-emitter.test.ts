import { prismaClient } from "../../repository/prisma/client"
import { OutboxEmitter } from "./outbox-emitter"


describe("Test outboxEmitter", () => {

    let sut: OutboxEmitter
     
    beforeEach(() => {
        sut = new OutboxEmitter(prismaClient)
    })
    it("Should", () => {

    })
})