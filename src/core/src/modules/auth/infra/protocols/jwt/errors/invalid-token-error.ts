export class InvalidTokenErrorError extends Error {
    constructor(){
        super(`Token provided is invalid.`)
        this.name = this.constructor.name
    }
}