export class StockManagementAlreadyIsItemError extends Error {
    constructor(){
        super(`Stock management already is item.`)
        this.name = this.constructor.name
    }
}