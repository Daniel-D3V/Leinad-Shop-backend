export class ImagesNotProvidedError extends Error {
    constructor(){
        super("Images field should be provided.")
        this.name = this.constructor.name
    }
}