export class AnnounceNormalStockIsAlreadyIsManualError extends Error {
    constructor(){
        super(`Announce normal stock already is manual.`)
        this.name = this.constructor.name
    }
}