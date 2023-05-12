export class InvalidUnitPriceTypeError extends Error {
    constructor(){
        super(`An invalid unitPrice type was provided. UnitPrice type should be a number`)
        this.name = this.constructor.name
    }
}