export class InvalidTitleTypeError extends Error {
    constructor(){
        super("Invalid title type was provided. Title type should be a string")
        this.name = this.constructor.name
    }
}