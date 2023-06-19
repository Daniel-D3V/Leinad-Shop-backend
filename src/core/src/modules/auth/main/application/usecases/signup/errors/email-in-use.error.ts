export class EmailInUseError extends Error {
    constructor(){
        super(`Email provided is already in use`)
        this.name = this.constructor.name
    }
}