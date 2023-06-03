export class StockNormalAlreadyCreatedError extends Error {
    constructor(){
        super(`stock normal already created .`)
        this.name = this.constructor.name
    }
}