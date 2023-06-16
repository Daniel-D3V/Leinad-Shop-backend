export class AnnounceManagementNotFoundError extends Error {
    constructor() {
        super(`Announce management could not be found.`)
        this.name = this.constructor.name
    }
}