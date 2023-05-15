export class UsernameNotProvidedError extends Error {
    constructor(){
        super("Username must be provided")
        this.name = this.constructor.name
    }
}