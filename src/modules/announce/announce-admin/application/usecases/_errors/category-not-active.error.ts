export class CategoryNotActiveError extends Error {
    constructor(){
        super("Could not complet this operation because category is not active.")
        this.name = this.constructor.name
    }
}