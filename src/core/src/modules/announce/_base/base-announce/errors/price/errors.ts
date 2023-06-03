export class InvalidPriceLengthError extends Error {
    constructor(min: number = 0.50, max: number = 10){
        super(`price length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}

export class InvalidPriceTypeError extends Error {
    constructor(){
        super("An invalid price type was provided. Price type should be a number")
        this.name = this.constructor.name
    }
}

export class PriceNotProvidedError extends Error {
    constructor(){
        super("Price should be provided.")
        this.name = this.constructor.name
    }
}