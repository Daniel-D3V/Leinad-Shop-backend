export class InvalidPriceLengthError extends Error {
    constructor(min: number = 1, max: number = 10){
        super(`price length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}