export class TwoFactorNotFoundError extends Error {
    constructor() {
        super(`Two factor could not be found.`)
        this.name = this.constructor.name
    }
}