export class ParentCategoryNotFoundError extends Error {
    constructor(){
        super(`Parent category could not be found.`)
        this.name = this.constructor.name
    }
}