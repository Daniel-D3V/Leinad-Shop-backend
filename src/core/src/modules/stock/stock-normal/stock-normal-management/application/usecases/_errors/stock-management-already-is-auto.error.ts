export class StockManagementAlreadyIsAutoError extends Error {
    constructor(){
        super(`Stock management already is auto.`)
        this.name = this.constructor.name
    }
}