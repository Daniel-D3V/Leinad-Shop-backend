export class QuantityNotProvidedError extends Error {
    constructor(){
        super(`Quantity not provided`)
        this.name = this.constructor.name
    }
}