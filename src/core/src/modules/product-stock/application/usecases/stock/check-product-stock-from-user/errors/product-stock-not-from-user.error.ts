export class ProductStockNotFromUserError extends Error {
    constructor(){
        super(`ProductStock not from user.`)
        this.name = this.constructor.name
    }
}