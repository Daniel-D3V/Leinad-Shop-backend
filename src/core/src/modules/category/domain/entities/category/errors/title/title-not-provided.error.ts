export class TitleNotProvidedError extends Error {
    constructor(){
        super("Title should be provided.")
        this.name = this.constructor.name
    }
}