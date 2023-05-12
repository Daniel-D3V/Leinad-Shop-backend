export class InvalidQuantitySizeError extends Error {
    constructor(max: number = 5){
        super(`An invalid quantity size is provided. Quantity size should be until ${max}`)
        this.name = this.constructor.name
    }
}