export class InvalidPasswordLengthError extends Error {
    constructor(min: number = 8, max: number = 100){
        super(`Password length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}