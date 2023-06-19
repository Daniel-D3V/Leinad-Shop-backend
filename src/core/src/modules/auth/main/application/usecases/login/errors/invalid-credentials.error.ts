export class InvalidCredentialsError extends Error {
    constructor(){
        super(`Credentials provided are invalid`)
        this.name = this.constructor.name
    }
}