export class InvalidImagesLengthError extends Error {
    constructor(max: number = 7){
        super(`Images length must be until ${max} images`)
        this.name = this.constructor.name
    }
}