export class StockItemTypeIsAlreadyManualError extends Error {
    constructor(){
        super(`Stock item type is already manual.`)
        this.name = this.constructor.name
    }
}