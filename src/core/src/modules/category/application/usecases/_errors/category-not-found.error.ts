export class CategoryNotFoundError extends Error {
    constructor() {
        super(`Category could not be found.`)
        this.name = this.constructor.name
    }
}