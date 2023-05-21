export class CategoryAlreadyDeactivatedError extends Error {
    constructor(){
        super(`Category already deactivated`)
        this.name = this.constructor.name
    }
}