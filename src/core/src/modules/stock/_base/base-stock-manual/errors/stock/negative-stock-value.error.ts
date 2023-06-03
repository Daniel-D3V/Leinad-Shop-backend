export class NegativeStockValueError extends Error {
    constructor(){
        super("Stock can't have a negative value.")
        this.name = this.constructor.name
    }
}