export class ProductStockAutoNotFoundError extends Error {
    constructor(){
        super(`Product stock auto could not be found.`)
        this.name = this.constructor.name
    }
}