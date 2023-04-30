export class InvalidWeightTypeError extends Error {
    constructor(){
        super("Invalid type of field weight. Weight should be a string")
        this.name = this.constructor.name
    }
}