export class InvalidValueTypeError extends Error {
    constructor(){
        super("An invalid value type was provided. Salue type should be a string")
        this.name = this.constructor.name
    }
}