export class InvalidDescriptionTypeError extends Error {
    constructor(){
        super("An invalid description type was provided. description type should be a string")
        this.name = this.constructor.name
    }
}