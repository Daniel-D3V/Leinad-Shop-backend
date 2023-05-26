export class ProductStockAlreadyIsAutoError extends Error {
    constructor(){
        super(`Product stock already is auto.`)
        this.name = this.constructor.name
    }
}