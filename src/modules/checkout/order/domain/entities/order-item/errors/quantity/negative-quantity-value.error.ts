export class NegativeQuantityValueError extends Error {
    constructor(){
        super(`Quantity value should not be negative`)
        this.name = this.constructor.name
    }
}