export class StockItemNormalNotFoundError extends Error {
    constructor(){
        super(`Stock item normal could not be found.`)
        this.name = this.constructor.name
    }
}