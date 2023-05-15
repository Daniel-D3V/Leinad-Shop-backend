export class InvalidPasswordTypeError extends Error {
    constructor(){
        super("An invalid password type was provided. Password type should be a string")
        this.name = this.constructor.name
    }
}