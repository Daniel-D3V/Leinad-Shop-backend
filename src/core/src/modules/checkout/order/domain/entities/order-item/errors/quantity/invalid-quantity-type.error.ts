export class InvalidQuantityTypeError extends Error {
    constructor(){
        super(`An invalid quantity type was provided. quantity type should be a number`)
        this.name = this.constructor.name
    }
}