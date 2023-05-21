export class InvalidRefreshTokenErrorError extends Error {
    constructor(){
        super(`RefreshToken provided is invalid.`)
        this.name = this.constructor.name
    }
}