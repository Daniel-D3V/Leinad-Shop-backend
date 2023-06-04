export class StockItemAlreadyCreatedError extends Error {
    constructor(){
        super(`Stock item already created.`)
        this.name = this.constructor.name
    }
}