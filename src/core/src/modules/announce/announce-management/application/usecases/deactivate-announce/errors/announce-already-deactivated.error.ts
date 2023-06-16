export class AnnounceAlreadyDeactivatedError extends Error {
    constructor() {
        super(`Announce is already deactivated.`)
        this.name = this.constructor.name
    }
}