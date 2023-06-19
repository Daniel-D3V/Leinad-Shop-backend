export class StockManagementAlreadyIsManualError extends Error {
    constructor(){
        super(`Stock management already is manual.`)
        this.name = this.constructor.name
    }
}