export class InvalidStockTypeError extends Error {
    constructor(){
        super("An invalid stock type was provided. Stock type should be a number")
        this.name = this.constructor.name
    }
}