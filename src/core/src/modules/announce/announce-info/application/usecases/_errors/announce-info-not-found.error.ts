export class AnnounceInfoNotFoundError extends Error {
    constructor(){
        super("Announce info could not be found.")
        this.name = this.constructor.name
    }
}