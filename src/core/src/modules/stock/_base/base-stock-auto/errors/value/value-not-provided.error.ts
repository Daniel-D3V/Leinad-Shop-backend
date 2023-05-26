export class ValueNotProvidedError extends Error {
    constructor(){
        super("Value should be provided.")
        this.name = this.constructor.name
    }
}