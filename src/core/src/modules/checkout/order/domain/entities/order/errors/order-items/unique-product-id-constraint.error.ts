export class UniqueProductIdConstraintError extends Error {
    constructor(){
        super(`a ProductId from from a orderItem can't be equal to a productId from another orderItem.`)
        this.name = this.constructor.name
    }
}