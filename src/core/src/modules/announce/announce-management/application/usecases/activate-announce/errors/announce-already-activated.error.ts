export class AnnounceAlreadyActivatedError extends Error {
    constructor() {
        super(`Announce is already activated.`)
        this.name = this.constructor.name
    }
}