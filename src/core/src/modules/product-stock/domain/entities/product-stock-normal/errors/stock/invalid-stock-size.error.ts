export class InvalidStockSizeError extends Error {
    constructor(max: number = 100000000){
        super(`Stock can't have a size greater than ${max}.`)
        this.name = this.constructor.name
    }
}