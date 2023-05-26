export class StockManagementAlreadyExistsError extends Error {
    constructor(){
        super(`Stock management already exists.`)
        this.name = this.constructor.name
    }
}