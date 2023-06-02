export interface GetAnnouncePriceFacadeInterface {
    execute(input: GetAnnouncePriceFacadeInterface.Input): Promise<number | undefined>
}

export namespace GetAnnouncePriceFacadeInterface {
    export type Input = {
        announceId: string
        announceItemId?: string
    }
}