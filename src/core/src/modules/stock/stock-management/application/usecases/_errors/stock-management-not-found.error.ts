export class StockManagementNotFoundError extends Error {
    constructor(){
        super(`Stock management could not be found.`)
        this.name = this.constructor.name
    }
}