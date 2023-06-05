export class StockItemManualNotFoundError extends Error {
    constructor(){
        super(`Stock item manual not found error.`)
        this.name = this.constructor.name
    }
}