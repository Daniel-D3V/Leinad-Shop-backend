export class InvalidTitleLengthError extends Error {
    constructor(min: number = 5, max: number = 150){
        super(`Title length must be between ${min} and ${max} characters`)
        this.name = this.constructor.name
    }
}

export class InvalidTitleTypeError extends Error {
    constructor(){
        super("An invalid title type was provided. Title type should be a string")
        this.name = this.constructor.name
    }
}

export class TitleNotProvidedError extends Error {
    constructor(){
        super("Title should be provided.")
        this.name = this.constructor.name
    }
}