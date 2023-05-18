export class InvalidUsernameTypeError extends Error {
    constructor(){
        super("An invalid username type was provided. Username type should be a string")
        this.name = this.constructor.name
    }
}