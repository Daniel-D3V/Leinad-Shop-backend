export class StockItemManagementManualAlreadyCreatedError extends Error {
    constructor(){
        super(`Stock item management manual already was created.`)
        this.name = this.constructor.name
    }
}