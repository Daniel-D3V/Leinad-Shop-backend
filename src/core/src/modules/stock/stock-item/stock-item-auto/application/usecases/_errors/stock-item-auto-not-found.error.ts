export class StockItemAutoNotFoundError extends Error {
    constructor(){
        super(`Stock item not could not be found.`)
        this.name = this.constructor.name
    }
}