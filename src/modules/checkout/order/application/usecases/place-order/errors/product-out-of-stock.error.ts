export class ProductOutOfStockError extends Error {
    constructor(id: string){
        super(`Product is out of stock, thus can't proceed.`)
        this.name = `${this.constructor.name}:${id}`
    }
}