export class StockItemAutoNotFoundError extends Error {
    constructor(){
        super(`Stock item auto could not be found.`)
        this.name = this.constructor.name
    }
}