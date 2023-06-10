export class ChatDeliveryAlreadyDeliveredError extends Error {
    constructor() {
        super(`ChatDelivery already delivered`)
        this.name = this.constructor.name
    }
}