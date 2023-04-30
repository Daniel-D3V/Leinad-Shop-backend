export class InvalidUrlLengthError extends Error {
    constructor(max: number = 255){
        super(`Url length must be until ${max}`);
        this.name = this.constructor.name
    }
}