export class ProductStockAlreadyIsManualError extends Error {
    constructor(){
        super(`Product stock already is auto.`)
        this.name = this.constructor.name
    }
}