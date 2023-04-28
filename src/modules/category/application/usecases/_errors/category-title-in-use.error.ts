export class CategoryTitleInUseError extends Error {
    constructor(){
        super(`Category title is already in use`)
        this.name = this.constructor.name
    }
}