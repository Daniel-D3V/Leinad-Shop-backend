export class PriceNotProvidedError extends Error {
    constructor(){
        super("Price should be provided.")
        this.name = this.constructor.name
    }
}