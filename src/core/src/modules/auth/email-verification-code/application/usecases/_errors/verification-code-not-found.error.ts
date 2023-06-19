export class VerificationCodeNotFoundError extends Error {
    constructor() {
        super(`Verification code could not be found.`)
        this.name = this.constructor.name
    }
}