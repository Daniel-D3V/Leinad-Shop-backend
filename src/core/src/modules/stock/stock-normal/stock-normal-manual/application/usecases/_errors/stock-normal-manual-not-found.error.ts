export class StockNormalManualNotFoundError extends Error {
    constructor(){
        super(`Stock normal manual could not be found.`)
        this.name = this.constructor.name
    }
}