export class InvalidTitleLengthError extends Error {
    constructor(min: number = 5, max: number = 255){
        super(`Title length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}