export class AnnounceNormalAlreadyCreatedError extends Error {
    constructor(){
        super(`Announce normal already created.`)
        this.name = this.constructor.name
    }
}