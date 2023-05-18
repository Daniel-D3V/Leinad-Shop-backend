export class UnitPriceNotPositiveError extends Error {
    constructor(){
        super(`Unit price must be greater than 0.`)
        this.name = this.constructor.name
    }
}