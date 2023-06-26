export class OrderNotFoundError extends Error {
    constructor() {
        super(`Order could not be found.`)
        this.name = this.constructor.name
    }
}

export class PaymentAlreadyCreatedError extends Error {
    constructor() {
        super(`Payment already was created.`)
        this.name = this.constructor.name
    }
}