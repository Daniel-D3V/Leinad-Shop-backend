export class OrderPaymentNotFoundError extends Error {
    constructor(){
        super(`Order payment could not be found.`)
        this.name = this.constructor.name
    }
}