export class InvalidWeightSizeError extends Error {
    constructor(min: number = 0, max: number = 1000000){
        super(`Weight size must be between ${min} and ${max}`);
        this.name = this.constructor.name
    }
}