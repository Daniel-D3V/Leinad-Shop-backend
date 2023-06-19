export class VerificationCodeAlreadyGeneratedError extends Error {
    constructor() {
        super(`VerificationCode already was generated.`)
        this.name = this.constructor.name
    }
}