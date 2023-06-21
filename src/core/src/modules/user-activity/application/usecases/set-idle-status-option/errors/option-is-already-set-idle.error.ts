export class OptionIsAlreadySetIdleError extends Error {
    constructor() {
        super(`Option is already set to idle`)
        this.name = this.constructor.name
    }
}