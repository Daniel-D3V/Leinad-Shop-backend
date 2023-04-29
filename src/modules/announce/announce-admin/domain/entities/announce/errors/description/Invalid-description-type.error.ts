export class InvalidDescriptionTypeError extends Error {
    constructor(){
        super("Description type provided is invalid. Description must be a string")
        this.name = this.constructor.name
    }
}