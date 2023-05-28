export class ProductStockAlreadyIsItemError extends Error {
    constructor(){
        super(`Product stock already is item.`)
        this.name = this.constructor.name
    }
}