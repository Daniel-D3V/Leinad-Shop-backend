export class EmailNotProvidedError extends Error {
    constructor(){
        super("Email must be provided")
        this.name = this.constructor.name
    }
}