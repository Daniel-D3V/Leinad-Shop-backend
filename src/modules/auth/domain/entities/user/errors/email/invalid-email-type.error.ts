export class InvalidEmailTypeError extends Error {
    constructor(){
        super("An invalid email type was provided. Email type should be a string")
        this.name = this.constructor.name
    }
}