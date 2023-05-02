export class InvalidValueLengthError extends Error {
    constructor(min: number = 0, max: number = 1000){
        super(`Invalid value length. Value length must be between ${min} and ${max}`)
        this.name = this.constructor.name
    }
}