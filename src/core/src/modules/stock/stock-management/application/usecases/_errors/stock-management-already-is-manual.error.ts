export class StockManagementAlreadyIsManualError extends Error {
    constructor(){
        super(`Stock management already is auto.`)
        this.name = this.constructor.name
    }
}