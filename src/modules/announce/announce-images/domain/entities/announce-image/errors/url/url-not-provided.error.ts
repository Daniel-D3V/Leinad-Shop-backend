export class UrlNotProvidedError extends Error {
    constructor(){
        super("Url field should be provided.")
        this.name = this.constructor.name
    }
}