export class YupErrorAdapter {
    static toYupFormat(error: Error): string  {
        return JSON.stringify({
            name: error.name,
            message: error.message
        })
    }
    static toDomainFormat(formatedError: string): Error  {
        const err = JSON.parse(formatedError)
        const error = new Error(err.message)
        error.name = err.name
        return error
    }
}
