export class StockManualAlreadyCreatedError extends Error {
    constructor(){
        super(`stock manual already created .`)
        this.name = this.constructor.name
    }
}