export class NoStockItemAutoAvailableError extends Error {
    constructor(){
        super(`No Stock Item Auto Available.`)
        this.name = this.constructor.name
    }
}