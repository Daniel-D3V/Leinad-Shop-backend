export class StockItemNotFoundError extends Error {
    constructor(){
        super(`Stock item could not be found.`)
        this.name = this.constructor.name
    }
}