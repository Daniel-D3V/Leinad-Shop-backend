export class InvalidOrderItemsSizeError extends Error {
    constructor(max: number = 10){
        super(`An invalid order items size is provided. Quantity size should be until ${max}`)
        this.name = this.constructor.name
    }
}