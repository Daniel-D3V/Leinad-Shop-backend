export class VerificationCodeExpiredError extends Error {
    constructor() {
        super(`Verification code is expired.`)
        this.name = this.constructor.name
    }
}