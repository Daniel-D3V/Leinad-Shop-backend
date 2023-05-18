export class InvalidPriceTypeError extends Error {
    constructor(){
        super("An invalid price type was provided. Price type should be a number")
        this.name = this.constructor.name
    }
}