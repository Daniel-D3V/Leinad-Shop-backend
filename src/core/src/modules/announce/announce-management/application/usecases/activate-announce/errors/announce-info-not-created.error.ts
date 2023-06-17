export class AnnounceInfoNotCreatedError extends Error {
    constructor() {
        super(`Announce info should be created in order to activate the announce.`)
        this.name = this.constructor.name
    }
}