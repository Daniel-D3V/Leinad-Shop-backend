export class EmailAlreadyVerifiedError extends Error {
    constructor(){
        super(`Email already verified.`)
        this.name = this.constructor.name
    }
}