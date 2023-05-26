export class StockNotProvidedError extends Error {
    constructor(){
        super("Stock field should be provided.")
        this.name = this.constructor.name
    }
}