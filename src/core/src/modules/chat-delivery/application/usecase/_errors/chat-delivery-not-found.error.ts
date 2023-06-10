export class ChatDeliveryNotFoundError extends Error {
    constructor() {
        super(`ChatDelivery could not be found.`)
        this.name = this.constructor.name
    }
}