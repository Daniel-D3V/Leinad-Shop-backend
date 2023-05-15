export class InvalidUsernameLengthError extends Error {
    constructor(min: number = 5, max: number = 20){
        super(`Username length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}