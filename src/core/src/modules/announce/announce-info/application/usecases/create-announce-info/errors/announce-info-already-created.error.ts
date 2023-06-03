export class AnnounceInfoAlreadyCreatedError extends Error {
    constructor(){
        super("Announce info already created.")
        this.name = this.constructor.name
    }
}