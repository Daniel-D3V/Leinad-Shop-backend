export class Invalid2faTokenError extends Error {
    constructor() {
        super(`2fa token provided is invalid.`)
        this.name = this.constructor.name
    }
}