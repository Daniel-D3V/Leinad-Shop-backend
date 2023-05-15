export class InvalidPasswordFormatError extends Error {
    constructor(){
        super("Invalid password format")
        this.name = this.constructor.name
    }
}