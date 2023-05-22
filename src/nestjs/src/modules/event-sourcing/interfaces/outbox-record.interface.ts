export type OutboxRecordInterface = {
    id: string
    eventName: string
    timestamp: Date
    status: string
    retry_count: number
    error_message: string
    payload: any

}