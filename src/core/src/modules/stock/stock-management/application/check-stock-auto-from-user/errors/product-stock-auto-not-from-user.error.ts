export class ProductStockAutoNotFromUserError extends Error {
    constructor(){
        super(`ProductStock auto not from user.`)
        this.name = this.constructor.name
    }
}