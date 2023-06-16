export class AnnounceTypeAlreadyIsNormalError extends Error {
    constructor() {
        super(`Announce type already is normal.`)
        this.name = this.constructor.name
    }
}