export class ProductNotFoundError extends Error {
    constructor(){
        super(`Product could not be found.`)
        this.name = this.constructor.name
    }
}