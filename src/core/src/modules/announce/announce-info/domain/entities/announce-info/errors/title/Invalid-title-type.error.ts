export class InvalidTitleTypeError extends Error {
    constructor(){
        super("An invalid title type was provided. Title type should be a string")
        this.name = this.constructor.name
    }
}