export class NoAttachmentOrContentProvidedError extends Error {
    constructor() {
        super(`At least one Attachments or a Content should be provided.`)
        this.name = this.constructor.name
    }
}