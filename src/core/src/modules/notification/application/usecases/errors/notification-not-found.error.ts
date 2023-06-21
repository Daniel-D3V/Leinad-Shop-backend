export class NotificationNotFoundError extends Error {
    constructor() {
        super(`Notification could not be found.`)
        this.name = this.constructor.name
    }
}