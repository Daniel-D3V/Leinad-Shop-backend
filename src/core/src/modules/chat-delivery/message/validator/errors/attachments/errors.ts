export class InvalidAttachmentsTypeError extends Error {
    constructor() {
        super("An invalid content type was provided. Attachments type should be a string array")
        this.name = this.constructor.name
    }
}

export class InvalidAttachmentsMaxLengthError extends Error {
    constructor(max: number = 5) {
        super(`Attachments max length is ${max}`)
        this.name = this.constructor.name
    }
}