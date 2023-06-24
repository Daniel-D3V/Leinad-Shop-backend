export class AnnounceItemStockIsAlreadyIsAutoError extends Error {
    constructor(){
        super(`Announce item stock already is auto.`)
        this.name = this.constructor.name
    }
}