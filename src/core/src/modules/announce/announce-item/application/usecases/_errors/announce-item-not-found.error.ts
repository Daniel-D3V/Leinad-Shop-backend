export class AnnounceItemNotFoundError extends Error {
    constructor(){
        super(`Announce item could not be found.`)
        this.name = this.constructor.name
    }
}