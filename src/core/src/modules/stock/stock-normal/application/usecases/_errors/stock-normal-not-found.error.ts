export class StockNormalNotFoundError extends Error {
    constructor(){
        super(`Stock normal could not be found.`)
        this.name = this.constructor.name
    }
}