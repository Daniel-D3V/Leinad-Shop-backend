export class WeightNotProvidedError extends Error {
    constructor(){
        super("Weight field should be provided.")
        this.name = this.constructor.name
    }
}