export class TwoFactorIsNotValidError extends Error {
    constructor() {
        super(`2fa is not valid.`)
        this.name = this.constructor.name
    }
}