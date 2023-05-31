export class StockManagementAlreadyIsNormalError extends Error {
    constructor(){
        super(`Stock management already is normal.`)
        this.name = this.constructor.name
    }
}