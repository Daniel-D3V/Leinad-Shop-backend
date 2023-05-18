export class AnnounceNotFoundError extends Error {
    constructor(){
        super("Announce could not be found.")
        this.name = this.constructor.name
    }
}