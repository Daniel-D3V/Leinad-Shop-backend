export class ProductStockNormalAlreadyCreatedError extends Error {
    constructor(){
        super(`Product stock normal already created .`)
        this.name = this.constructor.name
    }
}