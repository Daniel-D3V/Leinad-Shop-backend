export class StockManagementAutoNotFoundError extends Error {
    constructor(){
        super(`Stock management stock auto could not be found.`)
        this.name = this.constructor.name
    }
}