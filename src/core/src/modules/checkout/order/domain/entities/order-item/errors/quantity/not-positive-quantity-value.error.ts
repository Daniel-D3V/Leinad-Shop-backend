export class NotPositiveQuantityValueError extends Error {
    constructor(){
        super(`Quantity value must be greater that 0`)
        this.name = this.constructor.name
    }
}