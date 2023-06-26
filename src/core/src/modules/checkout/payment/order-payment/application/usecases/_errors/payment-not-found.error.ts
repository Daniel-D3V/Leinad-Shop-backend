export class PaymentNotFoundError extends Error {
    constructor(){
        super(`Payment could not be found.`)
        this.name = this.constructor.name
    }
}