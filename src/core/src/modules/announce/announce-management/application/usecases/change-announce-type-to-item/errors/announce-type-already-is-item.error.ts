export class AnnounceTypeAlreadyIsItemError extends Error {
    constructor() {
        super(`Announce type already is item.`)
        this.name = this.constructor.name
    }
}