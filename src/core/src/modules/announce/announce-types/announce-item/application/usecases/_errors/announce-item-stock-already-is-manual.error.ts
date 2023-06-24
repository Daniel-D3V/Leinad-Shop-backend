export class AnnounceItemStockIsAlreadyIsManualError extends Error {
    constructor(){
        super(`Announce item stock already is manual.`)
        this.name = this.constructor.name
    }
}