export class AnnounceNotFromUserError extends Error {
    constructor(){
        super("Announce is not from user.")
        this.name = this.constructor.name
    }
}