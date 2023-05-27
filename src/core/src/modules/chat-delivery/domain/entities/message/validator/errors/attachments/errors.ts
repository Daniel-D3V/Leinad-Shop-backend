export class InvalidAttachmentsTypeError extends Error {
    constructor() {
        super("Invalid attachment type. Should be an attachment")
        this.name = this.constructor.name
    }
}

export class InvalidAttachmentsMaxLengthError extends Error {
    constructor(max: number = 5) {
        super(`Attachments max length is ${max}`)
        this.name = this.constructor.name
    }
}