import { formatError } from "@core/domain/dist/src/modules/@shared/utils";

export class ApplicationError extends Error {

    private status: number = 400
    private errors: Error[]

    constructor(errors: Error[]) {
        super();
        this.errors = errors
    }

    setStatus(status: number) {
        this.status = status
    }

    getStatus(): number {
        return this.status
    }

    getErrors(): Error[] {
        return this.errors
    }

    formatErrors() {
        return formatError(this.errors)
    }

}