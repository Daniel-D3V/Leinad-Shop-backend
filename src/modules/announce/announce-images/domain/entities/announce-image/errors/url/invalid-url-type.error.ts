export class InvalidUrlTypeError extends Error {
    constructor(){
        super("Invalid type of field url. Url should be a string")
        this.name = this.constructor.name
    }
}