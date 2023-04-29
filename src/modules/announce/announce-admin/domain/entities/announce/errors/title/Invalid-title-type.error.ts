export class InvalidTitleTypeError extends Error {
    constructor(){
        super("Title type provided is invalid. Title must be a string")
        this.name = this.constructor.name
    }
}