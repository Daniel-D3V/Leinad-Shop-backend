export class UserNotFoundError extends Error {
    constructor(){
        super("User could not be found")
        this.name = this.constructor.name
    }
}