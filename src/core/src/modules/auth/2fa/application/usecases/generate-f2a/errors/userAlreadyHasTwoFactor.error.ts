export class UserAlreadyHasTwoFactorError extends Error {
    constructor() {
        super(`User already has two factor.`)
        this.name = this.constructor.name
    }
}