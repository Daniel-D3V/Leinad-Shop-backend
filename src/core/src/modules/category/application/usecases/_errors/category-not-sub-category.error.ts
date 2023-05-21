export class CategoryNotSubCategoryError extends Error {
    constructor(){
        super(`Category is not a sub category.`)
        this.name = this.constructor.name
    }
}