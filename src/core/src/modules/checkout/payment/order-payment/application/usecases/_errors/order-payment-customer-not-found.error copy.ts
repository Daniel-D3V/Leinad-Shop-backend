export class OrderPaymentCustomerNotFoundError extends Error {
    constructor(){
        super(`Order payment customer could not be found.`)
        this.name = this.constructor.name
    }
}