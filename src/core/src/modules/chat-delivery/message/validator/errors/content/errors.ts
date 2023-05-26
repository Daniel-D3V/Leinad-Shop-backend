export class InvalidContentTypeError extends Error {
    constructor() {
        super("An invalid content type was provided. Content type should be a string")
        this.name = this.constructor.name
    }
}

export class InvalidContentLengthError extends Error {
    constructor(min: number = 1, max: number = 1000) {
        super(`Content length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}