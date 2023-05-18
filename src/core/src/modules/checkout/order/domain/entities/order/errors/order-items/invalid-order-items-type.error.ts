export class InvalidOrderItemsTypeError extends Error {
    constructor(){
        super(`An invalid orderItems type was provided. orderItems type should be an array.`)
        this.name = this.constructor.name
    }
}