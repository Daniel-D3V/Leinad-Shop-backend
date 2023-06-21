export class UserActivityNotFoundError extends Error {
    constructor() {
        super(`UserActivity could not be found.`)
        this.name = this.constructor.name
    }
}