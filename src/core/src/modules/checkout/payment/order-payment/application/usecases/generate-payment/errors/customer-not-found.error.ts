export class CustomerNotFoundError extends Error {
    constructor(){
        super(`Customer could not be found.`)
        this.name = this.constructor.name
    }
}