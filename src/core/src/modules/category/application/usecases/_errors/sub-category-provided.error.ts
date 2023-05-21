export class SubCategoryProvidedError extends Error {
    constructor(){
        super(`Sub category was provided.`)
        this.name = this.constructor.name
    }
}