export class StockAutoNotFoundError extends Error {
    constructor(){
        super(`Stock auto could not be found.`)
        this.name = this.constructor.name
    }
}