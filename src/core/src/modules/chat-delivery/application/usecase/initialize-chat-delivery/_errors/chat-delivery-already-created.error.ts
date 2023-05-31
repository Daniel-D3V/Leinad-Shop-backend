export class ChatDeliveryAlreadyCreatedError extends Error {
    constructor() {
        super(`ChatDelivery was already created.`)
        this.name = this.constructor.name
    }
}