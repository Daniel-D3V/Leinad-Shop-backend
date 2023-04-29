export class InvalidDescriptionLengthError extends Error {
    constructor(min: number = 5, max: number = 500){
        super(`Description length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}