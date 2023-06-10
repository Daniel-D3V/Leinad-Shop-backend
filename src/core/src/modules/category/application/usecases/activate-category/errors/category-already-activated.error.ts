export class CategoryAlreadyActivatedError extends Error {
    constructor() {
        super(`Category already activated`)
        this.name = this.constructor.name
    }
}