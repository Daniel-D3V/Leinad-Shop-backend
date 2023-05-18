export class UsernameInUseError extends Error {
    constructor(){
        super(`Username provided is already in use`)
        this.name = this.constructor.name
    }
}