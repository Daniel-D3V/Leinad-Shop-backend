export class TwoFactorIsAlreadyValidError extends Error {
    constructor() {
        super(`2fa already is valid.`)
        this.name = this.constructor.name
    }
}