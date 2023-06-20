export class TemporaryTokenNotFoundError extends Error {
    constructor() {
        super(`Temporary token could not be found.`)
        this.name = this.constructor.name
    }
}