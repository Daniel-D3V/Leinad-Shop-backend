export class StockItemTypeIsAlreadyAutoError extends Error {
    constructor(){
        super(`Stock item type is already auto.`)
        this.name = this.constructor.name
    }
}