export class ProductStockNotFoundError extends Error {
    constructor(){
        super(`Product stock could not be found.`)
        this.name = this.constructor.name
    }
}