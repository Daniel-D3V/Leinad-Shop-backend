export class StockItemNormalAlreadyInitializedError extends Error {
    constructor(){
        super(`Stock item normal already initialized `)
        this.name = this.constructor.name
    }
}
