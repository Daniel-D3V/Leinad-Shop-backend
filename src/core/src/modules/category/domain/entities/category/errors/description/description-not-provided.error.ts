export class DescriptionNotProvidedError extends Error {
    constructor(){
        super("Description should be provided.")
        this.name = this.constructor.name
    }
}