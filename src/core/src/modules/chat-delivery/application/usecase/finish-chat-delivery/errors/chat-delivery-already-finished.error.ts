export class ChatDeliveryAlreadyFinishedError extends Error {
    constructor() {
        super(`ChatDelivery already finished`)
        this.name = this.constructor.name
    }
}