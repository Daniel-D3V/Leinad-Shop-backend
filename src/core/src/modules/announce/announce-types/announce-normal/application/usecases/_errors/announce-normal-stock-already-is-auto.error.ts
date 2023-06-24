export class AnnounceNormalStockIsAlreadyIsAutoError extends Error {
    constructor(){
        super(`Announce normal stock already is auto.`)
        this.name = this.constructor.name
    }
}