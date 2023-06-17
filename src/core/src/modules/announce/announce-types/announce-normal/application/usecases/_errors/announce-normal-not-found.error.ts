export class AnnounceNormalNotFoundError extends Error {
    constructor(){
        super("Announce normal could not be found.")
        this.name = this.constructor.name
    }
}