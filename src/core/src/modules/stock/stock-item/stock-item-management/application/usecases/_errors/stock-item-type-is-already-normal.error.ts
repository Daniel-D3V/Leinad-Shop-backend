export class StockItemTypeIsAlreadyNormalError extends Error {
    constructor(){
        super(`Stock item type is already normal.`)
        this.name = this.constructor.name
    }
}