export class PasswordNotProvidedError extends Error {
    constructor(){
        super("Password must be provided")
        this.name = this.constructor.name
    }
}