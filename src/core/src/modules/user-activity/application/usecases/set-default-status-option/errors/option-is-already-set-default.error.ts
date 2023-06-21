export class OptionIsAlreadySetDefaultError extends Error {
    constructor() {
        super(`Option is already set to default`)
        this.name = this.constructor.name
    }
}