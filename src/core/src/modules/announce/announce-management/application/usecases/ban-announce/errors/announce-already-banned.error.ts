export class AnnounceAlreadyBannedError extends Error {
    constructor() {
        super(`Announce is already banned.`)
        this.name = this.constructor.name
    }
}