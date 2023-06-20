export class Invalid2faCodeError extends Error {
    constructor() {
        super(`2fa code provided is invalid.`)
        this.name = this.constructor.name
    }
}